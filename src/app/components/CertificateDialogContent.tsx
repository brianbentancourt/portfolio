
"use client";
import * as React from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { EducationEntryType } from "@/lib/types";

interface CertificateDialogContentProps {
  entry: EducationEntryType;
  t: (key: string, options?: { replacements?: Record<string, string | number>, fallback?: string }) => string;
}

export function CertificateDialogContent({ entry, t }: CertificateDialogContentProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  React.useEffect(() => {
    setIsImageLoading(true); // Reset loading state when entry changes (dialog opens for a new cert)
  }, [entry.certificateUrl]);

  if (!entry.certificateUrl) {
    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{entry.title}</DialogTitle>
        </DialogHeader>
        <p>{t('educationSection.noCertificateAvailable', { fallback: 'No certificate image available for this entry.'})}</p>
        <div className="text-right mt-4">
            <DialogTrigger asChild>
              <Button variant="outline">{t('common.closeButton')}</Button>
            </DialogTrigger>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
      <DialogHeader className="p-6 pb-2 shrink-0">
        <DialogTitle>{t('educationSection.certificateModalTitle', { replacements: { title: entry.title } })}</DialogTitle>
        <DialogDescription>
          {entry.institution} - {entry.period}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="flex-grow min-h-0 px-6 py-2">
        <div className="relative aspect-[calc(8.5/11)] w-full mx-auto max-w-full max-h-[calc(80vh-120px)] bg-muted rounded-md overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/70">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          <Image
            src={entry.certificateUrl}
            alt={t('educationSection.certificateModalAlt', { replacements: { title: entry.title }, fallback: `Certificate for ${entry.title}` })}
            fill
            className={`object-contain p-1 transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)} // Also stop loading on error
            data-ai-hint={entry.certificateImageAiHint || "certificate document"}
            unoptimized // Keep unoptimized for placeholders or if originals are already optimized
          />
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
