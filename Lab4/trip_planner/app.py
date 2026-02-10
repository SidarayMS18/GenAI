import streamlit as st
import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timedelta
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

load_dotenv()

st.set_page_config(page_title="Trip Planner Agent", page_icon="✈️", layout="wide")

# Initialize LLM
@st.cache_resource
def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-pro",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        temperature=0.7
    )

def get_weather_data(city, date_str):
    """Get weather forecast from OpenWeather API"""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Get current weather
        current = data['list'][0]
        current_weather = {
            'temp': current['main']['temp'],
            'description': current['weather'][0]['description'],
            'humidity': current['main']['humidity']
        }
        
        # Get forecast
        forecast = []
        for item in data['list'][:8]:  # Next 24 hours
            forecast.append({
                'time': item['dt_txt'],
                'temp': item['main']['temp'],
                'description': item['weather'][0]['description']
            })
        
        return current_weather, forecast
    except Exception as e:
        st.error(f"Weather API error: {str(e)}")
        return None, None

def get_flight_options(origin, destination, date):
    """Mock flight data - replace with actual API"""
    return [
        {"airline": "Air India", "departure": "10:00 AM", "arrival": "2:30 PM", "price": "$450"},
        {"airline": "IndiGo", "departure": "2:00 PM", "arrival": "6:30 PM", "price": "$380"},
        {"airline": "Vistara", "departure": "6:00 PM", "arrival": "10:30 PM", "price": "$420"}
    ]

def get_hotel_options(city):
    """Mock hotel data - replace with actual API"""
    return [
        {"name": "Grand Hotel", "rating": "4.5★", "price": "$120/night"},
        {"name": "City Inn", "rating": "4.0★", "price": "$85/night"},
        {"name": "Luxury Resort", "rating": "5.0★", "price": "$250/night"}
    ]

def generate_city_description(city, llm):
    """Generate cultural and historical description"""
    prompt = ChatPromptTemplate.from_template(
        "Write a concise 1-paragraph description about {city}'s cultural and historic significance. "
        "Focus on key landmarks, traditions, and historical importance."
    )
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"city": city})

def generate_trip_plan(city, days, weather_info, llm):
    """Generate day-by-day trip itinerary"""
    prompt = ChatPromptTemplate.from_template(
        "Create a detailed {days}-day trip itinerary for {city}. "
        "Consider the weather: {weather}. "
        "Include morning, afternoon, and evening activities for each day. "
        "Suggest specific attractions, restaurants, and experiences."
    )
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({
        "city": city,
        "days": days,
        "weather": weather_info
    })

# Streamlit UI
st.title("✈️ AI Trip Planner Agent")
st.markdown("Plan your perfect trip with AI-powered recommendations and real-time data")

# Sidebar
with st.sidebar:
    st.header("Configuration")
    st.info("Make sure API keys are set in .env file")
    
    if st.button("Clear Cache"):
        st.cache_data.clear()
        st.success("Cache cleared!")

# Main interface
user_prompt = st.text_input(
    "Enter your trip request:",
    placeholder="e.g., Plan a 3-day trip to Tokyo in May"
)

if st.button("Plan My Trip", type="primary"):
    if not user_prompt:
        st.warning("Please enter a trip request")
    else:
        with st.spinner("Planning your trip..."):
            llm = get_llm()
            
            # Parse user input
            prompt_lower = user_prompt.lower()
            
            # Extract city
            cities = ["tokyo", "udaipur", "paris", "london", "new york", "dubai"]
            city = next((c for c in cities if c in prompt_lower), "Tokyo")
            city = city.title()
            
            # Extract days
            days = 3
            if "2-day" in prompt_lower or "2 day" in prompt_lower:
                days = 2
            elif "3-day" in prompt_lower or "3 day" in prompt_lower:
                days = 3
            
            # Extract month
            months = ["january", "february", "march", "april", "may", "june",
                     "july", "august", "september", "october", "november", "december"]
            month = next((m for m in months if m in prompt_lower), "may")
            
            # Display results
            st.header(f"🌍 {days}-Day Trip to {city}")
            
            # 1. City Description
            st.subheader("📖 About the City")
            with st.spinner("Generating city description..."):
                description = generate_city_description(city, llm)
                st.write(description)
            
            # 2. Weather Information
            st.subheader("🌤️ Weather Information")
            col1, col2 = st.columns(2)
            
            current_weather, forecast = get_weather_data(city, month)
            
            if current_weather:
                with col1:
                    st.metric("Current Temperature", f"{current_weather['temp']}°C")
                    st.write(f"**Conditions:** {current_weather['description'].title()}")
                    st.write(f"**Humidity:** {current_weather['humidity']}%")
                
                with col2:
                    st.write("**Forecast (Next 24 hours):**")
                    for f in forecast[:3]:
                        st.write(f"• {f['time']}: {f['temp']}°C, {f['description']}")
            else:
                st.info(f"Weather data for {city} in {month.title()}: Typically pleasant, 20-25°C")
            
            # 3. Travel Dates
            st.subheader("📅 Travel Dates")
            start_date = datetime(2026, 5, 15)  # Example date
            end_date = start_date + timedelta(days=days)
            st.write(f"**Departure:** {start_date.strftime('%B %d, %Y')}")
            st.write(f"**Return:** {end_date.strftime('%B %d, %Y')}")
            
            # 4. Flight Options
            st.subheader("✈️ Flight Options")
            flights = get_flight_options("Your City", city, start_date)
            
            for i, flight in enumerate(flights, 1):
                with st.expander(f"Option {i}: {flight['airline']} - {flight['price']}"):
                    st.write(f"**Departure:** {flight['departure']}")
                    st.write(f"**Arrival:** {flight['arrival']}")
                    st.write(f"**Price:** {flight['price']}")
            
            # 5. Hotel Options
            st.subheader("🏨 Hotel Recommendations")
            hotels = get_hotel_options(city)
            
            cols = st.columns(3)
            for i, hotel in enumerate(hotels):
                with cols[i]:
                    st.write(f"**{hotel['name']}**")
                    st.write(f"Rating: {hotel['rating']}")
                    st.write(f"Price: {hotel['price']}")
            
            # 6. Trip Itinerary
            st.subheader("🗺️ Day-by-Day Itinerary")
            with st.spinner("Creating your personalized itinerary..."):
                weather_summary = f"{current_weather['temp']}°C, {current_weather['description']}" if current_weather else "pleasant weather"
                itinerary = generate_trip_plan(city, days, weather_summary, llm)
                st.markdown(itinerary)
            
            st.success("✅ Trip plan generated successfully!")
            st.balloons()

# Footer
st.markdown("---")
st.markdown("*Powered by Google Gemini, OpenWeather API, and LangChain*")
