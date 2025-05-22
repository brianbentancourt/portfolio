
"use client";
// Removed Image import as it's no longer used in this component
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { SkillType } from "@/lib/types"; // Removed ExperienceType as it's no longer directly used for static data
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

// Structure for experiences, now using translation keys
const experienceTranslationKeys = [
  {
    id: "exp_sonda",
    titleKey: "about.experiences.sonda.title",
    companyKey: "about.experiences.sonda.company",
    durationKey: "about.experiences.sonda.duration",
    descriptionItemKeys: [
      "about.experiences.sonda.desc1",
      "about.experiences.sonda.desc2",
      "about.experiences.sonda.desc3",
      "about.experiences.sonda.desc4",
      "about.experiences.sonda.desc5",
    ],
  },
  {
    id: "exp_delarrobla",
    titleKey: "about.experiences.delarrobla.title",
    companyKey: "about.experiences.delarrobla.company",
    durationKey: "about.experiences.delarrobla.duration",
    descriptionItemKeys: [
      "about.experiences.delarrobla.desc1",
      "about.experiences.delarrobla.desc2",
    ],
  },
  {
    id: "exp_actualred",
    titleKey: "about.experiences.actualred.title",
    companyKey: "about.experiences.actualred.company",
    durationKey: "about.experiences.actualred.duration",
    descriptionItemKeys: [
      "about.experiences.actualred.desc1",
      "about.experiences.actualred.desc2",
      "about.experiences.actualred.desc3",
      "about.experiences.actualred.desc4",
    ],
  },
  {
    id: "exp_urudata",
    titleKey: "about.experiences.urudata.title",
    companyKey: "about.experiences.urudata.company",
    durationKey: "about.experiences.urudata.duration",
    descriptionItemKeys: [
      "about.experiences.urudata.desc1",
    ],
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t('about.title')} icon={User}>
      <div className="mb-12 text-center md:text-left">
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
          {experienceTranslationKeys.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id} className="border-b-0 mb-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full">
                  <span className="text-lg font-medium text-primary">{t(exp.titleKey)}</span>
                  <span className="text-sm text-muted-foreground mt-1 sm:mt-0">{t(exp.companyKey)} - {t(exp.durationKey)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {exp.descriptionItemKeys.map((itemKey, index) => (
                    <li key={index}>{t(itemKey)}</li>
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
