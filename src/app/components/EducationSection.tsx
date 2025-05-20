
"use client";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ExternalLink, FileText, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import * as React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { educationData } from "@/lib/data/educationData"; // Import centralized data
import { CertificateDialogContent } from "./CertificateDialogContent"; // Import extracted dialog

export function EducationSection() {
  const { t } = useLanguage();
  const certificates = educationData.filter(entry => !!entry.certificateUrl);

  return (
    <Section id="education" title={t('educationSection.title')} icon={GraduationCap}>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        {t('educationSection.description')}
      </p>
      
      {/* Main Education Entries */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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
            <CardFooter className="flex justify-between items-center">
              {entry.certificateUrl && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('educationSection.viewCertificateButton')}
                    </Button>
                  </DialogTrigger>
                  <CertificateDialogContent entry={entry} t={t} />
                </Dialog>
              )}
              {entry.id === "edu_platzi_courses" && (
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <Link href="http://brianbentancourt.com/courses" target="_blank" rel="noopener noreferrer">
                    {t('educationSection.viewCoursesLink', {fallback: "View All Courses"})}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Certificates Carousel/Scroll Section */}
      {certificates.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-foreground">
            {t('educationSection.myCertificatesTitle', { fallback: "My Certificates"})}
          </h3>
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
            {certificates.map((certEntry) => (
              <Dialog key={`cert-${certEntry.id}`}>
                <DialogTrigger asChild>
                  <Card className="min-w-[200px] max-w-[200px] h-[280px] flex flex-col overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow">
                    <div className="relative w-full h-[180px] bg-muted flex-shrink-0">
                      <Image
                        src={certEntry.certificateUrl!}
                        alt={t('educationSection.certificateModalAlt', { replacements: { title: certEntry.title }, fallback: `Certificate for ${certEntry.title}` })}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform"
                        sizes="200px"
                        data-ai-hint={certEntry.certificateImageAiHint || "certificate document"}
                        unoptimized
                      />
                    </div>
                    <CardContent className="p-3 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-primary truncate group-hover:text-primary/80">{certEntry.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{certEntry.institution}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-xs justify-start p-1 h-auto">
                        <Eye className="mr-1.5 h-3.5 w-3.5"/>{t('educationSection.viewButton', {fallback: "View"})}
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <CertificateDialogContent entry={certEntry} t={t} />
              </Dialog>
            ))}
          </div>
        </div>
      )}

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
