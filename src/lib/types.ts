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
  clientImplementations?: Array<{ name: string; link: string; status?: string }>;
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

export interface EducationEntryType {
  id: string;
  title: string; // e.g., "Analista Programador" or "Full Stack Web Development"
  institution: string; // e.g., "Universidad de la República" or "Coderhouse"
  period: string; // e.g., "2017 - 2020" or "Completed 2021"
  description?: string; // A brief overview
  details?: string[]; // Bullet points for more specifics
  logoUrl?: string;
  logoAiHint?: string;
  certificateUrl?: string; // Direct URL to the certificate image
  certificateImageAiHint?: string; // AI hint for the certificate image
}

export interface DiplomaType {
  id: string;
  title: string;
  issuer: string;
  date: string; // e.g., "2021" or "March 2022"
  imageUrl: string;
  imageAiHint?: string;
}
