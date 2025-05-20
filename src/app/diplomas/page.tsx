
"use client";
import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { DiplomaCard } from "./components/DiplomaCard";
import { BadgeCard } from "@/app/components/BadgeCard"; // Import BadgeCard
import { Award, Star, Loader2 } from "lucide-react"; // Added Star for Badges
import { useLanguage } from "@/contexts/LanguageContext";
import type { FirebaseDiplomaType, FirebaseBadgeType } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";

export default function DiplomasAndBadgesPage() {
  const { t } = useLanguage();
  const [diplomas, setDiplomas] = React.useState<FirebaseDiplomaType[]>([]);
  const [isLoadingDiplomas, setIsLoadingDiplomas] = React.useState(true);
  const [diplomasError, setDiplomasError] = React.useState<string | null>(null);

  const [badges, setBadges] = React.useState<FirebaseBadgeType[]>([]);
  const [isLoadingBadges, setIsLoadingBadges] = React.useState(true);
  const [badgesError, setBadgesError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDiplomas = async () => {
      setIsLoadingDiplomas(true);
      setDiplomasError(null);
      try {
        const diplomasCollection = collection(db, "diplomas");
        const diplomasQuery = query(diplomasCollection, orderBy("date", "desc"));
        const querySnapshot = await getDocs(diplomasQuery);
        const fetchedDiplomas: FirebaseDiplomaType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Diploma",
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
            src: data.src || "",
          };
        });
        setDiplomas(fetchedDiplomas);
      } catch (err) {
        console.error("Error fetching diplomas:", err);
        setDiplomasError(t('diplomasPage.fetchError', { fallback: "Failed to load diplomas. Please try again later."}));
      } finally {
        setIsLoadingDiplomas(false);
      }
    };

    const fetchBadges = async () => {
      setIsLoadingBadges(true);
      setBadgesError(null);
      try {
        const badgesCollection = collection(db, "badges");
        const badgesQuery = query(badgesCollection, orderBy("date", "desc"));
        const querySnapshot = await getDocs(badgesQuery);
        const fetchedBadges: FirebaseBadgeType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Badge",
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
            school: data.school || "Unknown Issuer",
            src: data.src || "",
            url: data.url || "#",
          };
        });
        setBadges(fetchedBadges);
      } catch (err) {
        console.error("Error fetching badges:", err);
        setBadgesError(t('badgesPage.fetchError', { fallback: "Failed to load badges. Please try again later."}));
      } finally {
        setIsLoadingBadges(false);
      }
    };

    fetchDiplomas();
    fetchBadges();
  }, [t]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Section id="diplomas-gallery" title={t('diplomasPage.title')} icon={Award}>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('diplomasPage.description')}
          </p>

          {/* Diplomas Section */}
          {isLoadingDiplomas && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg text-muted-foreground">{t('diplomasPage.loading', { fallback: "Loading diplomas..."})}</p>
            </div>
          )}
          {diplomasError && !isLoadingDiplomas &&(
            <p className="text-center text-destructive text-lg py-10">{diplomasError}</p>
          )}
          {!isLoadingDiplomas && !diplomasError && diplomas.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {diplomas.map((diplomaEntry) => (
                <DiplomaCard key={diplomaEntry.id} entry={diplomaEntry} />
              ))}
            </div>
          )}
          {!isLoadingDiplomas && !diplomasError && diplomas.length === 0 && (
            <p className="text-center text-muted-foreground text-lg py-10">
              {t('diplomasPage.noDiplomas', { fallback: "No diplomas to display at the moment. Please check back later."})}
            </p>
          )}

          {/* Badges Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-8 text-center md:text-left text-foreground flex items-center justify-center md:justify-start gap-2">
              <Star className="h-7 w-7 text-primary" />
              {t('diplomasPage.badgesTitle', { fallback: "My Badges" })}
            </h3>
            {isLoadingBadges && (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-lg text-muted-foreground">{t('badgesPage.loading', { fallback: "Loading badges..."})}</p>
              </div>
            )}
            {badgesError && !isLoadingBadges && (
              <p className="text-center text-destructive text-lg py-10">{badgesError}</p>
            )}
            {!isLoadingBadges && !badgesError && badges.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {badges.map((badgeEntry) => (
                  <BadgeCard key={`badge-page-${badgeEntry.id}`} entry={badgeEntry} />
                ))}
              </div>
            )}
            {!isLoadingBadges && !badgesError && badges.length === 0 && (
              <p className="text-center text-muted-foreground text-lg py-10">
                {t('badgesPage.noBadges', { fallback: "No badges to display at the moment."})}
              </p>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
