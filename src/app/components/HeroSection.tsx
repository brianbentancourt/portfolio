
"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="py-20 md:py-32 bg-gradient-to-br from-background to-muted/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            {t('hero.name')}
          </h1>
          <p className="text-xl sm:text-2xl text-primary font-semibold">
            {t('hero.title')}
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="#projects">
                <ArrowDown className="mr-2 h-5 w-5" />
                {t('hero.myWork')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/30 transition-shadow">
              <Link href="#contact">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('hero.contactMe')}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative group flex justify-center">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <Image
            src="/img/brian.png"
            alt={t('hero.name') + " - Profile"}
            width={400}
            height={400}
            priority
            className="rounded-full object-cover shadow-2xl border-4 border-background z-10 transform group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="cyberpunk portrait"
          />
        </div>
      </div>
    </section>
  );
}

