
"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { DiplomaCard } from "./components/DiplomaCard";
import type { DiplomaType } from "@/lib/types";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// User: Please replace this with your actual diploma data.
// The imageUrls should point to your diplomas stored in Firebase Storage or any other accessible URL.
const sampleDiplomas: DiplomaType[] = [
  {
    id: "analista-programador-ort",
    title: "Analista Programador",
    issuer: "Universidad ORT Uruguay",
    date: "2020",
    imageUrl: "https://picsum.photos/seed/ortdiploma/600/420",
    imageAiHint: "university diploma"
  },
  {
    id: "fullstack-coderhouse",
    title: "Full Stack Web Development",
    issuer: "Coderhouse",
    date: "Jul 2021",
    imageUrl: "https://picsum.photos/seed/coderhousedip1/600/420",
    imageAiHint: "coding certificate"
  },
  {
    id: "react-coderhouse",
    title: "React Development Course",
    issuer: "Coderhouse",
    date: "Jan 2021",
    imageUrl: "https://picsum.photos/seed/coderhousedip2/600/420",
    imageAiHint: "react certificate"
  },
  {
    id: "js-coderhouse",
    title: "JavaScript Programming",
    issuer: "Coderhouse",
    date: "Sep 2020",
    imageUrl: "https://picsum.photos/seed/coderhousedip3/600/420",
    imageAiHint: "javascript certificate"
  },
   {
    id: "webdev-coderhouse",
    title: "Web Development Course",
    issuer: "Coderhouse",
    date: "Jul 2020",
    imageUrl: "https://picsum.photos/seed/coderhousedip4/600/420",
    imageAiHint: "web certificate"
  },
  // Add more diplomas here
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
              No diplomas to display at the moment. Please check back later.
            </p>
          )}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
