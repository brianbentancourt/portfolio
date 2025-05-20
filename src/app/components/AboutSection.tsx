
"use client";
// Removed Image import as it's no longer used in this component
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { SkillType, ExperienceType } from "@/lib/types";
import { User, Code, Briefcase, Brain, Palette, Database, Cloud, GitBranch, BarChartBig, Smartphone, Sigma } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const skills: SkillType[] = [
  { id: "javascript", name: "JavaScript (ES6+, TypeScript)", icon: Code },
  { id: "react", name: "React / React Native", icon: Code },
  { id: "nextjs", name: "Next.js", icon: Code },
  { id: "nodejs", name: "Node.js (Express.js)", icon: Code },
  { id: "python", name: "Python", icon: Code },
  { id: "dotnet", name: "C# (.NET Framework & Core)", icon: Code },
  { id: "sql", name: "SQL (SQL Server, MySQL)", icon: Database },
  { id: "firebase", name: "Firebase", icon: Database },
  { id: "gcp", name: "Google Cloud (GCP)", icon: Cloud },
  { id: "git", name: "Git", icon: GitBranch },
  { id: "ai", name: "AI (Genkit, Gemini, Watsonx, Scikit-learn)", icon: Brain },
  { id: "powerbi", name: "Power BI", icon: BarChartBig },
  { id: "jquery", name: "jQuery", icon: Code },
  { id: "mui", name: "Material UI", icon: Palette},
  { id: "htmlcss", name: "HTML5 & CSS3", icon: Palette},
];

const experiences: ExperienceType[] = [
  {
    id: "exp_sonda",
    title: "Senior Software Developer",
    company: "SONDA",
    duration: "June 2022 - Present",
    descriptionItems: [
      "Full stack development focusing on .NET and JavaScript technologies.",
      "Team mentoring and leading development efforts on key projects.",
      "Maintenance and evolutionary development of systems for Prosegur.",
    ],
  },
  {
    id: "exp_delarrobla",
    title: "Software Developer",
    company: "De Larrobla & Asociados",
    duration: "January 2021 - June 2022",
    descriptionItems: [
      "Worked on critical financial systems for banking institutions in Peru and Uruguay.",
      "Development of functionalities related to OCA credit card systems.",
    ],
  },
  {
    id: "exp_actualred",
    title: "Software Developer",
    company: "Actualred",
    duration: "September 2016 - December 2020",
    descriptionItems: [
      "Developed and maintained a primary ERP-like system for the company and its clients.",
      "Collaborated on diverse company projects, enhancing skills in various technologies.",
      "Successfully launched the company's first mobile application for a major client, developed with Xamarin.",
      "Provided expert customer service with excellent problem-solving abilities.",
    ],
  },
  {
    id: "exp_urudata",
    title: "Service Desk",
    company: "Urudata S.A.",
    duration: "October 2014 - September 2016",
    descriptionItems: [
      "Provided IT support in networks, printers, user access, automated backups, and incident resolution.",
    ],
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t('about.title')} icon={User}>
      <div className="mb-12 text-center md:text-left"> {/* Container for text, ensuring full width and bottom margin */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t('about.greeting')}
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mt-4">
          {t('about.journey')}
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mt-4">
          {t('about.hobbies')}
        </p>
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
      <div className="mt-12">
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
