
import type { EducationEntryType } from "@/lib/types";

export const educationData: EducationEntryType[] = [
  {
    id: "edu_ort_analyst",
    titleKey: "education.ort_analyst.title",
    institutionKey: "education.ort_analyst.institution",
    periodKey: "education.ort_analyst.period",
    descriptionKey: "education.ort_analyst.description",
    detailKeys: [
      "education.ort_analyst.detail1",
      "education.ort_analyst.detail2",
      "education.ort_analyst.detail3",
      "education.ort_analyst.detail4",
    ],
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMh6i2GJOjC6DpnfI0rju0zGL9dVVsNH2BGA&s",
    logoAiHint: "university logo",
    certificateUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-pro-6p6np.firebasestorage.app/o/diplomas%2FAnalista%20programador.jpg?alt=media&token=0571cf67-3cd7-403e-ad61-f1cab7db8016", 
    certificateImageAiHint: "university degree certificate",
  },
  {
    id: "edu_itsp_bachillerato",
    titleKey: "education.itsp_bachillerato.title",
    institutionKey: "education.itsp_bachillerato.institution",
    periodKey: "education.itsp_bachillerato.period",
    descriptionKey: "education.itsp_bachillerato.description",
    logoUrl: "https://i.ibb.co/cRgC9hR/itsp.jpg",
    logoAiHint: "technical school logo",
    certificateUrl: "", 
    certificateImageAiHint: "high school diploma technology",
  },
  {
    id: "edu_platzi_courses",
    titleKey: "education.platzi_courses.title",
    institutionKey: "education.platzi_courses.institution",
    periodKey: "education.platzi_courses.period",
    descriptionKey: "education.platzi_courses.description",
    detailKeys: [
      "education.platzi_courses.detail1",
      "education.platzi_courses.detail2"
    ],
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHjIpFwK8LDdteq1cxYCg2x4Cfq7eXB7fVQ&s", 
    logoAiHint: "platzi logo",
  },
];

    