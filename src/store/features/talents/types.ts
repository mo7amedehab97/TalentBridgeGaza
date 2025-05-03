export interface Talent {
  talent_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  bio: string | null;
  location: string | null;
  availability: 'full-time' | 'part-time' | 'unavailable';
  hourly_rate: number | null;
  profile_picture_url: string | null;
  created_at: string;
  updated_at: string;
  skills?: TalentSkill[];
  portfolio_items?: PortfolioItem[];
  social_links?: SocialLink[];
}

export interface TalentSkill {
  skill_id: number;
  name: string;
  category: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years_of_experience: number | null;
}

export interface PortfolioItem {
  portfolio_id: number;
  title: string;
  description: string | null;
  media_url: string;
  media_type: 'image' | 'video' | 'link';
  created_at: string;
}

export interface SocialLink {
  social_id: number;
  platform: string;
  url: string;
} 