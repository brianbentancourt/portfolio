
"use client";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
  return (
    <Section id="contact" title={t('contactSection.title')} icon={Mail} className="bg-background">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('contactSection.description')}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href={`mailto:${t('contactSection.email')}`} className="text-muted-foreground hover:text-primary transition-colors">
                {t('contactSection.email')}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">{t('contactSection.phone')}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">{t('contactSection.location')}</span>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 sm:p-8 rounded-xl shadow-md">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

