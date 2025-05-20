
import type { EducationEntryType } from "@/lib/types";

export const educationData: EducationEntryType[] = [
  {
    id: "edu_ort_analyst",
    title: "Programmer Analyst",
    institution: "Universidad ORT Uruguay (CTC ORT)",
    period: "Completed 12/2017",
    description: "Graduated as a Programmer Analyst, acquiring a solid foundation in software development, algorithms, data structures, and database management.",
    details: [
      "Object-Oriented Programming.",
      "Web Development fundamentals.",
      "Database Design and SQL.",
      "Software Engineering Principles.",
    ],
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMh6i2GJOjC6DpnfI0rju0zGL9dVVsNH2BGA&s",
    logoAiHint: "university logo",
    certificateUrl: "https://placehold.co/850x1100.png", // Placeholder for actual certificate
    certificateImageAiHint: "university degree certificate",
  },
  {
    id: "edu_itsp_bachillerato",
    title: "Bachillerato Tecnológico Informático",
    institution: "Informática ITSP",
    period: "Completed 12/2012",
    description: "Completed technical high school degree with a specialization in informatics, providing early exposure to computer science concepts and programming.",
    logoUrl: "https://i.ibb.co/cRgC9hR/itsp.jpg",
    logoAiHint: "technical school logo",
    certificateUrl: "https://placehold.co/850x1100.png", // Placeholder for actual certificate
    certificateImageAiHint: "high school diploma technology",
  },
  {
    id: "edu_platzi_courses",
    title: "Various Online Courses",
    institution: "Platzi & other platforms",
    period: "Ongoing",
    description: "Continuously updating skills through online courses on platforms like Platzi, focusing on emerging technologies and advanced development topics. For a detailed list, see https://platzi.com/p/brianbentancourt/",
    details: [
        "Specializations in web development, AI, cloud technologies, and more.",
        "Refer to https://platzi.com/p/brianbentancourt/ for a detailed list."
    ],
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHjIpFwK8LDdteq1cxYCg2x4Cfq7eXB7fVQ&s", 
    logoAiHint: "platzi logo",
    // No single certificate URL for ongoing learning, can link to the courses page if desired.
    // However, if there are specific certificates from Platzi to showcase, they can be added as separate entries or this one could be updated.
    // For example, adding a specific Platzi course certificate:
    // certificateUrl: "https://placehold.co/850x1100_platzi_react.png", 
    // certificateImageAiHint: "platzi react course",
  },
  // Add more specific course certificates from Platzi or other platforms here as needed
  // Example:
  // {
  //   id: "edu_platzi_react_advanced",
  //   title: "Advanced React Course",
  //   institution: "Platzi",
  //   period: "2023",
  //   description: "Deep dive into advanced React concepts and patterns.",
  //   logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHjIpFwK8LDdteq1cxYCg2x4Cfq7eXB7fVQ&s",
  //   logoAiHint: "platzi logo",
  //   certificateUrl: "https://placehold.co/850x1100_react.png",
  //   certificateImageAiHint: "react course certificate"
  // },
];
