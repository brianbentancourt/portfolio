
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
  title: string; 
  institution: string; 
  period: string; 
  description?: string; 
  details?: string[]; 
  logoUrl?: string;
  logoAiHint?: string;
  certificateUrl?: string; 
  certificateImageAiHint?: string; 
}

export interface FirebaseDiplomaType {
  id: string; // Firestore document ID
  title: string;
  date: Date; // Converted from Firestore Timestamp
  src: string; // URL to certificate image
  // Optional: Add other fields if they exist in your Firestore documents
  // institution?: string; 
}

export interface CertificateDisplayInfo {
  title: string; 
  certificateUrl: string;
  certificateImageAiHint?: string;
  displayInstitution?: string; 
  displayPeriodOrDate?: string; 
}
