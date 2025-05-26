
"use client";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ExternalLink, FileText, Eye, Loader2, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import * as React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { educationData } from "@/lib/data/educationData";
import { CertificateDialogContent } from "./CertificateDialogContent";
import type { CertificateDisplayInfo, FirebaseDiplomaType, FirebaseBadgeType, EducationEntryKeysType } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { BadgeCard } from "./BadgeCard";

export function EducationSection() {
  const { t, locale } = useLanguage();
  const [firestoreDiplomas, setFirestoreDiplomas] = React.useState<FirebaseDiplomaType[]>([]);
  const [isLoadingFirestoreDiplomas, setIsLoadingFirestoreDiplomas] = React.useState(true);
  const [firestoreError, setFirestoreError] = React.useState<string | null>(null);

  const [firestoreBadges, setFirestoreBadges] = React.useState<FirebaseBadgeType[]>([]);
  const [isLoadingFirestoreBadges, setIsLoadingFirestoreBadges] = React.useState(true);
  const [firestoreBadgesError, setFirestoreBadgesError] = React.useState<string | null>(null);

  const dateLocale = locale === 'es' ? es : enUS;

  React.useEffect(() => {
    const fetchDiplomas = async () => {
      setIsLoadingFirestoreDiplomas(true);
      setFirestoreError(null);
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
        setFirestoreDiplomas(fetchedDiplomas);
      } catch (err) {
        console.error("Error fetching diplomas for carousel:", err);
        setFirestoreError(t('diplomasPage.fetchError', { fallback: "Failed to load diplomas. Please try again later."}));
      } finally {
        setIsLoadingFirestoreDiplomas(false);
      }
    };

    const fetchBadges = async () => {
      setIsLoadingFirestoreBadges(true);
      setFirestoreBadgesError(null);
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
        setFirestoreBadges(fetchedBadges);
      } catch (err) {
        console.error("Error fetching badges for carousel:", err);
        setFirestoreBadgesError(t('badgesPage.fetchError', { fallback: "Failed to load badges. Please try again later."}));
      } finally {
        setIsLoadingFirestoreBadges(false);
      }
    };

    fetchDiplomas();
    fetchBadges();
  }, [t]);

  const prepareStaticCertificateInfo = (entry: EducationEntryKeysType): CertificateDisplayInfo => ({
    title: t(entry.titleKey),
    certificateUrl: entry.certificateUrl!,
    certificateImageAiHint: entry.certificateImageAiHint,
    displayInstitution: t(entry.institutionKey),
    displayPeriodOrDate: t(entry.periodKey),
  });

  const prepareFirestoreCertificateInfo = (entry: FirebaseDiplomaType): CertificateDisplayInfo => ({
    title: entry.title,
    certificateUrl: entry.src,
    certificateImageAiHint: "diploma certificate document",
    displayPeriodOrDate: entry.date ? format(entry.date, 'PPP', { locale: dateLocale }) : t('diplomasPage.dateNotAvailable', {fallback: 'Date not available'}),
  });

  return (
    <Section id="education" title={t('educationSection.title')} icon={GraduationCap}>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        {t('educationSection.description')}
      </p>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {educationData.map((entry) => (
          <Card key={entry.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              {entry.logoUrl && (
                <Image
                  src={entry.logoUrl}
                  alt={`${t(entry.institutionKey)} logo`}
                  width={60}
                  height={60}
                  className="rounded-md object-contain flex-shrink-0 mt-0"
                  data-ai-hint={entry.logoAiHint || "education logo"}
                />
              )}
              <div className="flex-1">
                <CardTitle className="text-xl text-primary leading-none mt-0">{t(entry.titleKey)}</CardTitle>
                <p className="text-sm font-medium text-foreground">{t(entry.institutionKey)}</p>
                <p className="text-xs text-muted-foreground">{t(entry.periodKey)}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {entry.descriptionKey && <p className="text-muted-foreground mb-3">{t(entry.descriptionKey)}</p>}
              {entry.detailKeys && entry.detailKeys.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {entry.detailKeys.map((detailKey, index) => (
                    <li key={index}>{t(detailKey)}</li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              {entry.certificateUrl && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('educationSection.viewCertificateButton')}
                    </Button>
                  </DialogTrigger>
                  <CertificateDialogContent certificateInfo={prepareStaticCertificateInfo(entry)} t={t} />
                </Dialog>
              )}
              {entry.id === "edu_platzi_courses" && (
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <Link href="https://platzi.com/p/brianbentancourt/" target="_blank" rel="noopener noreferrer">
                    {t('educationSection.viewCoursesLink', {fallback: "View All Courses"})}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* My Certificates Carousel */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-foreground flex items-center gap-2">
          <FileText className="h-7 w-7 text-primary" />
          {t('educationSection.myCertificatesTitle', { fallback: "My Certificates"})}
        </h3>
        {isLoadingFirestoreDiplomas && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">{t('diplomasPage.loading', { fallback: "Loading certificates..."})}</p>
          </div>
        )}
        {firestoreError && !isLoadingFirestoreDiplomas && (
          <p className="text-center text-destructive py-6">{firestoreError}</p>
        )}
        {!isLoadingFirestoreDiplomas && !firestoreError && firestoreDiplomas.length > 0 && (
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
            {firestoreDiplomas.map((certEntry) => (
              <Dialog key={`cert-firestore-${certEntry.id}`}>
                <DialogTrigger asChild>
                  <Card className="min-w-[200px] max-w-[200px] h-[280px] flex flex-col overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow">
                    <div className="relative w-full h-[180px] bg-muted flex-shrink-0">
                      <Image
                        src={certEntry.src}
                        alt={t('educationSection.certificateModalAlt', { replacements: { title: certEntry.title }, fallback: `Certificate for ${certEntry.title}` })}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform"
                        sizes="200px"
                        data-ai-hint={"diploma certificate document"}
                        unoptimized
                      />
                    </div>
                    <CardContent className="p-3 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-primary truncate group-hover:text-primary/80">{certEntry.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {certEntry.date ? format(certEntry.date, 'MMM yyyy', { locale: dateLocale }) : t('diplomasPage.dateNotAvailable', {fallback: 'Date not available'})}
                        </p>
                      </div>
                       <Button variant="ghost" size="sm" className="w-full mt-2 text-xs justify-start p-1 h-auto">
                        <Eye className="mr-1.5 h-3.5 w-3.5"/>{t('educationSection.viewButton', {fallback: "View"})}
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <CertificateDialogContent certificateInfo={prepareFirestoreCertificateInfo(certEntry)} t={t} />
              </Dialog>
            ))}
          </div>
        )}
        {!isLoadingFirestoreDiplomas && !firestoreError && firestoreDiplomas.length === 0 && (
           <p className="text-center text-muted-foreground py-6">
            {t('diplomasPage.noDiplomas', { fallback: "No certificates to display at the moment."})}
          </p>
        )}
      </div>

      {/* My Badges Carousel */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-foreground flex items-center gap-2">
          <Star className="h-7 w-7 text-primary" />
          {t('educationSection.myBadgesTitle', { fallback: "My Badges" })}
        </h3>
        {isLoadingFirestoreBadges && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">{t('badgesPage.loading', { fallback: "Loading badges..." })}</p>
          </div>
        )}
        {firestoreBadgesError && !isLoadingFirestoreBadges && (
          <p className="text-center text-destructive py-6">{firestoreBadgesError}</p>
        )}
        {!isLoadingFirestoreBadges && !firestoreBadgesError && firestoreBadges.length > 0 && (
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
            {firestoreBadges.map((badgeEntry) => (
              <BadgeCard key={`badge-firestore-${badgeEntry.id}`} entry={badgeEntry} />
            ))}
          </div>
        )}
        {!isLoadingFirestoreBadges && !firestoreBadgesError && firestoreBadges.length === 0 && (
          <p className="text-center text-muted-foreground py-6">
            {t('badgesPage.noBadges', { fallback: "No badges to display at the moment." })}
          </p>
        )}
      </div>


      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/diplomas">
            {t('educationSection.viewAllDiplomasButton')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
    

    

