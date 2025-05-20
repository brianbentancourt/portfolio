
"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { DiplomaCard } from "./components/DiplomaCard";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { educationData } from "@/lib/data/educationData"; // Import centralized data
import type { EducationEntryType } from "@/lib/types";

export default function DiplomasPage() {
  const { t } = useLanguage();

  const diplomas: EducationEntryType[] = educationData.filter(
    (entry) => !!entry.certificateUrl
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Section id="diplomas-gallery" title={t('diplomasPage.title')} icon={Award}>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('diplomasPage.description')}
          </p>
          {diplomas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {diplomas.map((diplomaEntry) => (
                <DiplomaCard key={diplomaEntry.id} entry={diplomaEntry} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">
              {t('diplomasPage.noDiplomas', { fallback: "No diplomas to display at the moment. Please check back later or visit brianbentancourt.com/courses."})}
            </p>
          )}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
