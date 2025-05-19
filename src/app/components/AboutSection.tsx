
"use client";
import Image from "next/image"; // Added Image import
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { SkillType, ExperienceType } from "@/lib/types";
import { User, Code, Briefcase, Brain, Palette, Database, Cloud, GitBranch, BarChartBig, Smartphone, Sigma } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const skills: SkillType[] = [
  { id: "javascript", name: "JavaScript", icon: Code },
  { id: "react", name: "React / React Native", icon: Code },
  { id: "nextjs", name: "Next.js", icon: Code },
  { id: "nodejs", name: "Node.js", icon: Code },
  { id: "python", name: "Python", icon: Code },
  { id: "dotnet", name: ".NET", icon: Code },
  { id: "sql", name: "SQL (SQL Server)", icon: Database },
  { id: "firebase", name: "Firebase", icon: Database },
  { id: "gcp", name: "Google Cloud", icon: Cloud },
  { id: "git", name: "Git", icon: GitBranch },
  { id: "typescript", name: "TypeScript", icon: Code },
  { id: "tailwindcss", name: "Tailwind CSS", icon: Palette },
  { id: "ai", name: "AI (Watsonx, Scikit-learn, Copilot)", icon: Brain },
  { id: "powerbi", name: "Power BI", icon: BarChartBig },
];

const experiences: ExperienceType[] = [
  {
    id: "exp_sonda",
    title: "Senior Software Developer",
    company: "SONDA",
    duration: "June 2022 - Present",
    descriptionItems: [
      "Full stack development and team mentoring.",
    ],
  },
  {
    id: "exp_delarrobla",
    title: "Software Developer",
    company: "De Larrobla & Asociados",
    duration: "January 2021 - June 2022",
    descriptionItems: [
      "Worked on financial systems for banks in Peru and Uruguay.",
    ],
  },
  {
    id: "exp_actualred",
    title: "Software Developer",
    company: "Actualred",
    duration: "September 2016 - December 2020",
    descriptionItems: [
      "Developed for a primary project and collaborated on other company projects.",
      "Engaged in self-training to improve programming skills.",
      "Successfully launched the company's first mobile application for a major client, developed with Xamarin.",
      "Provided expert customer service with excellent problem-solving abilities and effective production system organization.",
    ],
  },
  {
    id: "exp_urudata",
    title: "Service Desk",
    company: "Urudata S.A.",
    duration: "October 2014 - September 2016",
    descriptionItems: [
      "Worked in a large team, providing support in networks, printers, user access to platforms, automated backups, and incident resolution through a ticketing platform.",
    ],
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t('about.title')} icon={User}>
      {/* Text and Image Grid */}
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
        <div className="lg:col-span-2 space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.greeting')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.journey')}
          </p>
           <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.hobbies')}
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[3/4] rounded-lg overflow-hidden shadow-xl group">
          <Image
            src="https://images.unsplash.com/photo-1656711103646-b1a400b48b3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={t('about.title') + " - workspace"}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(min-width: 1024px) 33vw, 100vw"
            data-ai-hint="modern workspace desk"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-foreground">{t('about.skillsTitle')}</h3>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {skills.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="text-sm px-3 py-1.5 shadow-sm hover:shadow-md transition-shadow cursor-default">
              {skill.icon && <skill.icon className="h-4 w-4 mr-2 text-primary" />}
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-12"> {/* Adjusted margin from mt-16 if skills also have mb-16 */}
        <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-foreground">{t('about.experienceTitle')}</h3>
        <Accordion type="single" collapsible className="w-full">
          {experiences.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id} className="border-b-0 mb-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full">
                  <span className="text-lg font-medium text-primary">{exp.title}</span>
                  <span className="text-sm text-muted-foreground mt-1 sm:mt-0">{exp.company} - {exp.duration}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {exp.descriptionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
