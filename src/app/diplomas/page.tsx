
"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { DiplomaCard } from "./components/DiplomaCard";
import { Award, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { FirebaseDiplomaType } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";

export default function DiplomasPage() {
  const { t } = useLanguage();
  const [diplomas, setDiplomas] = React.useState<FirebaseDiplomaType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDiplomas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const diplomasCollection = collection(db, "diplomas");
        const diplomasQuery = query(diplomasCollection, orderBy("date", "desc"));
        const querySnapshot = await getDocs(diplomasQuery);
        const fetchedDiplomas: FirebaseDiplomaType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Diploma",
            // Ensure date is a Firestore Timestamp and convert it
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
            src: data.src || "",
          };
        });
        setDiplomas(fetchedDiplomas);
      } catch (err) {
        console.error("Error fetching diplomas:", err);
        setError(t('diplomasPage.fetchError', { fallback: "Failed to load diplomas. Please try again later."}));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiplomas();
  }, [t]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Section id="diplomas-gallery" title={t('diplomasPage.title')} icon={Award}>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('diplomasPage.description')}
          </p>
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg text-muted-foreground">{t('diplomasPage.loading', { fallback: "Loading diplomas..."})}</p>
            </div>
          )}
          {error && (
            <p className="text-center text-destructive text-lg py-10">{error}</p>
          )}
          {!isLoading && !error && diplomas.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {diplomas.map((diplomaEntry) => (
                <DiplomaCard key={diplomaEntry.id} entry={diplomaEntry} />
              ))}
            </div>
          )}
          {!isLoading && !error && diplomas.length === 0 && (
            <p className="text-center text-muted-foreground text-lg py-10">
              {t('diplomasPage.noDiplomas', { fallback: "No diplomas to display at the moment. Please check back later."})}
            </p>
          )}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
