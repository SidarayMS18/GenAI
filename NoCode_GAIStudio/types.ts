
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metrics: string;
  imageUrl: string;
  publishStatus: 'published' | 'draft';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  category: string;
  publishStatus: 'published' | 'draft';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  date: string;
}

export interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  siteName: string;
  metaDescription: string;
  sections: {
    hero: boolean;
    services: boolean;
    innovation: boolean;
    portfolio: boolean;
    faq: boolean;
  };
}

export interface AppState {
  projects: Project[];
  posts: BlogPost[];
  team: TeamMember[];
  leads: Lead[];
  settings: SiteSettings;
}
