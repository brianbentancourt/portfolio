export interface ProjectType {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
  imageAiHint?: string;
}

export interface SkillType {
  id: string;
  name: string;
  icon?: React.ElementType; // Optional: For displaying icons next to skills
}

export interface ExperienceType {
  id: string;
  title: string;
  company: string;
  duration: string;
  descriptionItems: string[];
}
