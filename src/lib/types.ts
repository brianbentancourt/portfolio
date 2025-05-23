
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
  icon?: React.ElementType; 
}

export interface ExperienceType {
  id: string;
  title: string;
  company: string;
  duration: string;
  descriptionItems: string[];
}

// For static data in educationData.ts, using translation keys
export interface EducationEntryKeysType {
  id: string;
  titleKey: string;
  institutionKey: string;
  periodKey: string;
  descriptionKey?: string;
  detailKeys?: string[];
  logoUrl?: string;
  logoAiHint?: string;
  certificateUrl?: string; 
  certificateImageAiHint?: string;
}

// For data fetched from Firestore
export interface FirebaseDiplomaType {
  id: string; 
  title: string;
  date: Date; 
  src: string; 
}

export interface FirebaseBadgeType {
  id: string; 
  title: string;
  date: Date; 
  school: string; 
  src: string; 
  url: string; 
}

// Generic type for displaying certificate/badge info in modal
export interface CertificateDisplayInfo {
  title: string;
  certificateUrl: string;
  certificateImageAiHint?: string;
  displayInstitution?: string;
  displayPeriodOrDate?: string;
}

    