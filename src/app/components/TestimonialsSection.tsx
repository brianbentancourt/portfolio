
"use client";

import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, MessageSquareText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: string;
  nameKey: string;
  roleKey: string;
  feedbackKey: string;
  avatarSrc?: string; // Optional: for client image
  avatarFallback: string; // e.g., "AC" for Agustin Ceballos
  avatarAiHint?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "agustin_ceballos",
    nameKey: "testimonialsSection.agustin_ceballos.name",
    roleKey: "testimonialsSection.agustin_ceballos.role",
    feedbackKey: "testimonialsSection.agustin_ceballos.feedback",
    avatarFallback: "AC",
  },
  {
    id: "bruno_fiorelli",
    nameKey: "testimonialsSection.bruno_fiorelli.name",
    roleKey: "testimonialsSection.bruno_fiorelli.role",
    feedbackKey: "testimonialsSection.bruno_fiorelli.feedback",
    avatarFallback: "BF",
  },
  {
    id: "sebastian_fagundez",
    nameKey: "testimonialsSection.sebastian_fagundez.name",
    roleKey: "testimonialsSection.sebastian_fagundez.role",
    feedbackKey: "testimonialsSection.sebastian_fagundez.feedback",
    avatarFallback: "SF",
  },
];

export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <Section id="testimonials" title={t('testimonialsSection.title')} icon={MessageSquareText} className="bg-muted/30">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
        {testimonialsData.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 mb-6">
                {testimonial.avatarSrc && (
                   <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary shadow-md shrink-0">
                    <AvatarImage src={testimonial.avatarSrc} alt={t(testimonial.nameKey)} data-ai-hint={testimonial.avatarAiHint || "client photo"} />
                    <AvatarFallback className="text-2xl">{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                )}
                 {!testimonial.avatarSrc && (
                   <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary bg-primary/10 text-primary shadow-md shrink-0 flex items-center justify-center">
                    <AvatarFallback className="text-3xl font-semibold">{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-grow">
                  <CardTitle className="text-xl font-semibold text-primary mb-1">{t(testimonial.nameKey)}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</CardDescription>
                </div>
              </div>
              <div className="relative">
                <Quote className="h-10 w-10 text-primary/20 absolute top-2 left-2 transform -translate-x-1/2 -translate-y-1/2 rotate-180" />
                <blockquote className="text-muted-foreground italic leading-relaxed text-center md:text-left">
                  {t(testimonial.feedbackKey)}
                </blockquote>
                <Quote className="h-10 w-10 text-primary/20 absolute bottom-2 right-2 transform translate-x-1/2 translate-y-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

