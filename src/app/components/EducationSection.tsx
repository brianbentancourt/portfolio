
"use client";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ExternalLink, FileText, Loader2 } from "lucide-react";
import type { EducationEntryType } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const educationData: EducationEntryType[] = [
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
    certificateUrl: "https://placehold.co/850x1100.png",
    certificateImageAiHint: "university degree certificate",
  },
  {
    id: "edu_itsp_bachillerato",
    title: "Bachillerato Tecnológico Informático",
    institution: "Informática ITSP",
    period: "Completed 12/2012",
    description: "Completed technical high school degree with a specialization in informatics, providing early exposure to computer science concepts and programming.",
    logoUrl: "https://i.ibb.co/cRgC9hR/itsp.jpg", // Updated logo URL
    logoAiHint: "technical school logo", // Updated AI hint
    certificateUrl: "https://placehold.co/850x1100.png",
    certificateImageAiHint: "high school diploma technology",
  },
  {
    id: "edu_platzi_courses",
    title: "Various Online Courses",
    institution: "Platzi & other platforms (brianbentancourt.com/courses)",
    period: "Ongoing",
    description: "Continuously updating skills through online courses on platforms like Platzi, focusing on emerging technologies and advanced development topics.",
    details: [
        "Specializations in web development, AI, cloud technologies, and more.",
        "Refer to brianbentancourt.com/courses for a detailed list."
    ],
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHjIpFwK8LDdteq1cxYCg2x4Cfq7eXB7fVQ&s", 
    logoAiHint: "platzi logo",
    // No single certificate URL for ongoing learning, can link to the courses page if desired.
  },
];

function CertificateDialogContent({ entry, t }: { entry: EducationEntryType, t: (key: string, options?: { replacements?: Record<string, string | number>, fallback?: string }) => string }) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  React.useEffect(() => {
    setIsImageLoading(true);
  }, [entry.certificateUrl]);


  return (
    <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
      <DialogHeader className="p-6 pb-2 shrink-0">
        <DialogTitle>{t('educationSection.certificateModalTitle', { replacements: { title: entry.title }})}</DialogTitle>
        <DialogDescription>
          {entry.institution} - {entry.period}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="flex-grow min-h-0 px-6 py-2">
        <div className="relative aspect-[calc(8.5/11)] w-full mx-auto max-w-full max-h-[calc(80vh-120px)] bg-muted rounded-md overflow-hidden">
          {isImageLoading && entry.certificateUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/70">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {entry.certificateUrl ? (
             <Image
              src={entry.certificateUrl}
              alt={t('educationSection.certificateModalTitle', { replacements: { title: entry.title } })}
              fill
              className={`object-contain p-1 transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              data-ai-hint={entry.certificateImageAiHint || "certificate document"}
              unoptimized 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No certificate image available.
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-6 pt-4 border-t shrink-0 text-right">
        <DialogTrigger asChild>
          <Button variant="outline">{t('common.closeButton')}</Button>
        </DialogTrigger>
      </div>
    </DialogContent>
  );
}


export function EducationSection() {
  const { t } = useLanguage();

  return (
    <Section id="education" title={t('educationSection.title')} icon={GraduationCap}>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        {t('educationSection.description')}
      </p>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {educationData.map((entry) => (
          <Card key={entry.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              {entry.logoUrl && (
                <Image
                  src={entry.logoUrl}
                  alt={`${entry.institution} logo`}
                  width={60}
                  height={60}
                  className="rounded-md object-contain"
                  data-ai-hint={entry.logoAiHint || "education logo"}
                />
              )}
              <div className="flex-1">
                <CardTitle className="text-xl text-primary">{entry.title}</CardTitle>
                <p className="text-sm font-medium text-foreground">{entry.institution}</p>
                <p className="text-xs text-muted-foreground">{entry.period}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {entry.description && <p className="text-muted-foreground mb-3">{entry.description}</p>}
              {entry.details && entry.details.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {entry.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </CardContent>
            {entry.certificateUrl && (
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('educationSection.viewCertificateButton')}
                    </Button>
                  </DialogTrigger>
                  <CertificateDialogContent entry={entry} t={t} />
                </Dialog>
              </CardFooter>
            )}
             {entry.id === "edu_platzi_courses" && !entry.certificateUrl && ( // Specific handling for courses link
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href="http://brianbentancourt.com/courses" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Courses
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
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
