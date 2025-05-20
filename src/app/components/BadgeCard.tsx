
"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CertificateDialogContent } from "./CertificateDialogContent";
import type { FirebaseBadgeType, CertificateDisplayInfo } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { ExternalLink, Eye, Loader2 } from "lucide-react";
import * as React from "react";

interface BadgeCardProps {
  entry: FirebaseBadgeType;
}

export function BadgeCard({ entry }: BadgeCardProps) {
  const { t, locale } = useLanguage();
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const dateLocale = locale === 'es' ? es : enUS;

  const formattedDate = entry.date ? format(entry.date, 'MMM yyyy', { locale: dateLocale }) : t('diplomasPage.dateNotAvailable', { fallback: 'Date not available' });

  const certificateInfo: CertificateDisplayInfo = {
    title: entry.title,
    certificateUrl: entry.src,
    certificateImageAiHint: "digital badge achievement",
    displayInstitution: entry.school,
    displayPeriodOrDate: formattedDate,
  };

  return (
    <Dialog>
      <Card className="min-w-[200px] max-w-[200px] h-[280px] flex flex-col overflow-hidden group hover:shadow-xl transition-shadow">
        <DialogTrigger asChild>
          <div className="relative w-full h-[140px] bg-muted flex-shrink-0 cursor-pointer group-hover:opacity-90 transition-opacity">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/70">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <Image
              src={entry.src}
              alt={t('educationSection.badgeAlt', { replacements: { title: entry.title }, fallback: `Badge for ${entry.title}` })}
              fill
              className={`object-contain p-3 transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              sizes="180px"
              data-ai-hint="digital badge achievement"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              unoptimized={entry.src.includes('credly.com')} // Credly images might have issues with Next/Image optimization
            />
          </div>
        </DialogTrigger>
        <CardContent className="p-3 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-primary truncate group-hover:text-primary/80" title={entry.title}>{entry.title}</p>
            <p className="text-xs text-muted-foreground truncate" title={entry.school}>{entry.school}</p>
            <p className="text-xs text-muted-foreground truncate">{formattedDate}</p>
          </div>
          <div className="mt-2 space-y-1">
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full text-xs justify-start p-1 h-auto">
                <Eye className="mr-1.5 h-3.5 w-3.5" />{t('educationSection.viewButton', { fallback: "View Image" })}
              </Button>
            </DialogTrigger>
            <Button variant="ghost" size="sm" asChild className="w-full text-xs justify-start p-1 h-auto">
              <Link href={entry.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                {t('educationSection.verifyBadgeButton', { fallback: "Verify Badge" })}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <CertificateDialogContent certificateInfo={certificateInfo} t={t} />
    </Dialog>
  );
}
