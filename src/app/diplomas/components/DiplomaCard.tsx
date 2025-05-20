
"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { EducationEntryType } from "@/lib/types";
import * as React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Loader2, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CertificateDialogContent } from "@/app/components/CertificateDialogContent"; // Import shared dialog

interface DiplomaCardProps {
  entry: EducationEntryType; // Changed from DiplomaType to EducationEntryType
}

export function DiplomaCard({ entry }: DiplomaCardProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const { t } = useLanguage();

  // Ensure certificateUrl exists, otherwise this component shouldn't be rendered for this entry
  if (!entry.certificateUrl) return null;

  return (
    <Dialog>
      <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-1">
        <DialogTrigger asChild>
          <div className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-muted">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/70">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}
            <Image
              src={entry.certificateUrl}
              alt={t('educationSection.certificateModalAlt', { replacements: { title: entry.title }, fallback: `Certificate for ${entry.title}` })}
              fill
              className={`object-contain transition-transform duration-300 group-hover:scale-105 p-2 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              data-ai-hint={entry.certificateImageAiHint || "certificate document"}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              unoptimized
            />
          </div>
        </DialogTrigger>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-base font-semibold text-primary group-hover:text-primary/80 transition-colors truncate">
            {entry.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3 text-sm text-muted-foreground">
          <p className="truncate">{entry.institution}</p>
          <p className="truncate">{entry.period}</p>
        </CardContent>
         <div className="p-4 pt-0 mt-auto">
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                 <Eye className="mr-2 h-4 w-4" />
                {t('diplomasPage.viewFullSizeButton', { fallback: 'View Full Size' })}
              </Button>
            </DialogTrigger>
          </div>
      </Card>
      <CertificateDialogContent entry={entry} t={t} />
    </Dialog>
  );
}
