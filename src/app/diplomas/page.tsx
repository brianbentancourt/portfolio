
"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { DiplomaCard } from "./components/DiplomaCard";
import type { DiplomaType } from "@/lib/types";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleDiplomas: DiplomaType[] = [
  {
    id: "analista-programador-ort",
    title: "Programmer Analyst",
    issuer: "Universidad ORT Uruguay (CTC ORT)",
    date: "December 2017",
    imageUrl: "https://placehold.co/600x420.png", // Placeholder, to be replaced with actual diploma image
    imageAiHint: "university diploma"
  },
  {
    id: "bachillerato-itsp",
    title: "Bachillerato Tecnológico Informático",
    issuer: "Informática ITSP",
    date: "December 2012",
    imageUrl: "https://placehold.co/600x420.png", // Placeholder
    imageAiHint: "technical diploma"
  },
  // Add more diplomas here if available, e.g., from brianbentancourt.com/courses
  // Example:
  // {
  //   id: "specific-course-platzi",
  //   title: "Advanced React Course",
  //   issuer: "Platzi",
  //   date: "2023",
  //   imageUrl: "https://placehold.co/600x420.png",
  //   imageAiHint: "online course certificate"
  // },
];

export default function DiplomasPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Section id="diplomas-gallery" title={t('diplomasPage.title')} icon={Award}>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('diplomasPage.description')}
          </p>
          {sampleDiplomas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleDiplomas.map((diploma) => (
                <DiplomaCard key={diploma.id} diploma={diploma} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">
              No diplomas to display at the moment. Please check back later or visit brianbentancourt.com/courses.
            </p>
          )}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
