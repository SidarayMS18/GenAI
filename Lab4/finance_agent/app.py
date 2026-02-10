import streamlit as st
import os
from dotenv import load_dotenv
import requests
import yfinance as yf
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

load_dotenv()

st.set_page_config(page_title="Finance & Currency Agent", page_icon="💰", layout="wide")

# Country data mapping
COUNTRY_DATA = {
    "japan": {
        "currency": "Japanese Yen",
        "code": "JPY",
        "indices": [
            {"name": "Nikkei 225", "symbol": "^N225", "exchange": "Tokyo Stock Exchange"},
            {"name": "TOPIX", "symbol": "^TOPX", "exchange": "Tokyo Stock Exchange"}
        ],
        "exchange_location": {"lat": 35.6762, "lng": 139.7653, "name": "Tokyo Stock Exchange"}
    },
    "india": {
        "currency": "Indian Rupee",
        "code": "INR",
        "indices": [
            {"name": "NIFTY 50", "symbol": "^NSEI", "exchange": "NSE"},
            {"name": "SENSEX", "symbol": "^BSESN", "exchange": "BSE"}
        ],
        "exchange_location": {"lat": 18.9292, "lng": 72.8331, "name": "Bombay Stock Exchange"}
    },
    "us": {
        "currency": "US Dollar",
        "code": "USD",
        "indices": [
            {"name": "S&P 500", "symbol": "^GSPC", "exchange": "NYSE"},
            {"name": "Dow Jones", "symbol": "^DJI", "exchange": "NYSE"},
            {"name": "NASDAQ", "symbol": "^IXIC", "exchange": "NASDAQ"}
        ],
        "exchange_location": {"lat": 40.7069, "lng": -74.0113, "name": "New York Stock Exchange"}
    },
    "south korea": {
        "currency": "South Korean Won",
        "code": "KRW",
        "indices": [
            {"name": "KOSPI", "symbol": "^KS11", "exchange": "Korea Exchange"},
            {"name": "KOSDAQ", "symbol": "^KQ11", "exchange": "Korea Exchange"}
        ],
        "exchange_location": {"lat": 37.5665, "lng": 126.9780, "name": "Korea Exchange"}
    },
    "china": {
        "currency": "Chinese Yuan",
        "code": "CNY",
        "indices": [
            {"name": "Shanghai Composite", "symbol": "000001.SS", "exchange": "Shanghai Stock Exchange"},
            {"name": "Shenzhen Component", "symbol": "399001.SZ", "exchange": "Shenzhen Stock Exchange"}
        ],
        "exchange_location": {"lat": 31.2304, "lng": 121.4737, "name": "Shanghai Stock Exchange"}
    },
    "uk": {
        "currency": "British Pound Sterling",
        "code": "GBP",
        "indices": [
            {"name": "FTSE 100", "symbol": "^FTSE", "exchange": "London Stock Exchange"},
            {"name": "FTSE 250", "symbol": "^FTMC", "exchange": "London Stock Exchange"}
        ],
        "exchange_location": {"lat": 51.5145, "lng": -0.0881, "name": "London Stock Exchange"}
    }
}

@st.cache_resource
def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-pro",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        temperature=0.3
    )

def get_exchange_rates(base_currency):
    """Get real-time exchange rates"""
    try:
        url = f"https://api.exchangerate-api.com/v4/latest/{base_currency}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        rates = {
            "USD": data['rates'].get('USD', 'N/A'),
            "INR": data['rates'].get('INR', 'N/A'),
            "GBP": data['rates'].get('GBP', 'N/A'),
            "EUR": data['rates'].get('EUR', 'N/A')
        }
        return rates
    except Exception as e:
        st.error(f"Exchange rate API error: {str(e)}")
        return {"USD": "N/A", "INR": "N/A", "GBP": "N/A", "EUR": "N/A"}

def get_stock_data(symbol):
    """Get real-time stock index data using yfinance"""
    try:
        ticker = yf.Ticker(symbol)
        data = ticker.history(period="1d")
        
        if not data.empty:
            current_price = data['Close'].iloc[-1]
            prev_close = ticker.info.get('previousClose', current_price)
            change = current_price - prev_close
            change_pct = (change / prev_close) * 100 if prev_close else 0
            
            return {
                "price": round(current_price, 2),
                "change": round(change, 2),
                "change_pct": round(change_pct, 2)
            }
        return None
    except Exception as e:
        st.warning(f"Could not fetch data for {symbol}: {str(e)}")
        return None

def generate_google_maps_embed(lat, lng, name):
    """Generate Google Maps embed HTML"""
    api_key = os.getenv("GOOGLE_MAPS_API_KEY", "")
    
    if api_key:
        # Using Google Maps Embed API
        embed_url = f"https://www.google.com/maps/embed/v1/place?key={api_key}&q={lat},{lng}&zoom=15"
        return f'<iframe width="100%" height="400" frameborder="0" style="border:0" src="{embed_url}" allowfullscreen></iframe>'
    else:
        # Fallback to static link
        maps_url = f"https://www.google.com/maps?q={lat},{lng}"
        return f'<a href="{maps_url}" target="_blank">📍 View {name} on Google Maps</a>'

def generate_country_summary(country, currency, llm):
    """Generate brief country financial summary"""
    prompt = ChatPromptTemplate.from_template(
        "Provide a brief 2-3 sentence summary about {country}'s economy and financial markets, "
        "mentioning its currency ({currency}) and major economic sectors."
    )
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"country": country, "currency": currency})

# Streamlit UI
st.title("💰 Finance & Currency Intelligence Agent")
st.markdown("Get real-time currency exchange rates and stock market data for any country")

# Sidebar
with st.sidebar:
    st.header("Supported Countries")
    for country in COUNTRY_DATA.keys():
        st.write(f"• {country.title()}")
    
    st.markdown("---")
    st.info("Data sources: ExchangeRate-API, Yahoo Finance, Google Maps")

# Main interface
user_prompt = st.text_input(
    "Enter your query:",
    placeholder="e.g., Give me currency and stock market details for Japan"
)

if st.button("Get Financial Data", type="primary"):
    if not user_prompt:
        st.warning("Please enter a country name")
    else:
        with st.spinner("Fetching financial data..."):
            llm = get_llm()
            
            # Parse country from input
            prompt_lower = user_prompt.lower()
            country_key = None
            
            for country in COUNTRY_DATA.keys():
                if country in prompt_lower:
                    country_key = country
                    break
            
            if not country_key:
                st.error("Country not found. Supported: Japan, India, US, South Korea, China, UK")
            else:
                country_info = COUNTRY_DATA[country_key]
                
                st.header(f"🌍 Financial Overview: {country_key.title()}")
                
                # Country Summary
                with st.spinner("Generating country summary..."):
                    summary = generate_country_summary(country_key.title(), country_info['currency'], llm)
                    st.info(summary)
                
                # 1. Currency Information
                st.subheader("💵 Currency Information")
                col1, col2 = st.columns([1, 2])
                
                with col1:
                    st.metric("Official Currency", country_info['currency'])
                    st.write(f"**Code:** {country_info['code']}")
                
                with col2:
                    st.write("**Exchange Rates (1 unit to):**")
                    rates = get_exchange_rates(country_info['code'])
                    
                    rate_cols = st.columns(4)
                    for i, (currency, rate) in enumerate(rates.items()):
                        with rate_cols[i]:
                            if isinstance(rate, (int, float)):
                                st.metric(currency, f"{rate:.4f}")
                            else:
                                st.metric(currency, rate)
                
                # 2. Stock Market Indices
                st.subheader("📈 Major Stock Indices")
                
                for index in country_info['indices']:
                    with st.expander(f"{index['name']} ({index['exchange']})", expanded=True):
                        stock_data = get_stock_data(index['symbol'])
                        
                        if stock_data:
                            col1, col2, col3 = st.columns(3)
                            
                            with col1:
                                st.metric("Current Value", f"{stock_data['price']:,.2f}")
                            
                            with col2:
                                st.metric(
                                    "Change",
                                    f"{stock_data['change']:+,.2f}",
                                    delta=f"{stock_data['change_pct']:+.2f}%"
                                )
                            
                            with col3:
                                st.write(f"**Symbol:** {index['symbol']}")
                                st.write(f"**Exchange:** {index['exchange']}")
                        else:
                            st.warning(f"Live data unavailable for {index['name']}")
                
                # 3. Stock Exchange Location
                st.subheader("📍 Stock Exchange Headquarters")
                
                location = country_info['exchange_location']
                st.write(f"**{location['name']}**")
                st.write(f"Coordinates: {location['lat']}, {location['lng']}")
                
                # Display map
                maps_html = generate_google_maps_embed(
                    location['lat'],
                    location['lng'],
                    location['name']
                )
                st.markdown(maps_html, unsafe_allow_html=True)
                
                # Alternative: Streamlit native map
                st.map(data={"lat": [location['lat']], "lon": [location['lng']]}, zoom=12)
                
                st.success("✅ Financial data retrieved successfully!")

# Footer
st.markdown("---")
st.markdown("*Powered by Google Gemini, Yahoo Finance, and ExchangeRate-API*")
