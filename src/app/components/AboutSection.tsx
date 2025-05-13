
"use client";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { SkillType, ExperienceType } from "@/lib/types";
import { User, Code, Briefcase, Brain, Palette } from "lucide-react"; 
import { useLanguage } from "@/contexts/LanguageContext";

// Skills data remains in English for now as per plan.
// Translation for these would require more complex data management.
const skills: SkillType[] = [
  { id: "react", name: "React", icon: Code },
  { id: "nextjs", name: "Next.js", icon: Code },
  { id: "typescript", name: "TypeScript", icon: Code },
  { id: "tailwindcss", name: "Tailwind CSS", icon: Palette },
  { id: "nodejs", name: "Node.js", icon: Code },
  { id: "python", name: "Python", icon: Code },
  { id: "figma", name: "Figma", icon: Palette },
  { id: "ai", name: "AI Integration", icon: Brain },
  { id: "sql", name: "SQL (PostgreSQL, MySQL)", icon: Code },
  { id: "nosql", name: "NoSQL (MongoDB, Firebase)", icon: Code },
  { id: "cloud", name: "Cloud (Firebase, GCP)", icon: Code },
  { id: "docker", name: "Docker", icon: Code },
];

// User: Please replace the content of this array with your actual professional experience from LinkedIn.
// The following are examples to guide you.
const experiences: ExperienceType[] = [
  {
    id: "exp_current", 
    title: "Lead Full-Stack Engineer & AI Specialist", 
    company: "Innovatech Solutions / Freelance Consultant", 
    duration: "March 2022 - Present", 
    descriptionItems: [
      "Spearheaded the design and development of enterprise-level web applications, incorporating advanced AI/ML models for enhanced functionality.",
      "Led cross-functional teams in agile environments, ensuring timely delivery of high-quality software products.",
      "Consulted with clients to define technical requirements and deliver custom software solutions that meet business objectives.",
      "Continuously researched and integrated emerging technologies to drive innovation and efficiency."
    ],
  },
  {
    id: "exp1",
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2021 - Feb 2022", 
    descriptionItems: [
      "Led development of high-performance, client-facing web applications using React, Next.js, and TypeScript.",
      "Collaborated closely with UX/UI designers and product managers to implement responsive, accessible, and user-centric interfaces.",
      "Mentored junior developers, conducted code reviews, and promoted best practices in frontend development, improving team velocity by 15%.",
      "Pioneered the integration of AI-powered features for content personalization and recommendation engines, significantly improving user engagement metrics."
    ],
  },
  {
    id: "exp2",
    title: "Full-Stack Developer",
    company: "Web Innovators Co.",
    duration: "Jun 2018 - Dec 2020",
    descriptionItems: [
      "Developed and maintained full-stack applications using MERN stack (MongoDB, Express.js, React, Node.js).",
      "Designed and implemented RESTful APIs for various microservices, ensuring scalability and reliability.",
      "Contributed to database design and optimization (MongoDB), improving query performance by 25%.",
      "Actively participated in an Agile development process, including sprint planning, daily stand-ups, and retrospectives."
    ],
  },
  {
    id: "exp3",
    title: "Junior Web Developer",
    company: "Digital Creations Agency",
    duration: "Aug 2016 - May 2018",
    descriptionItems: [
      "Assisted in the development of WordPress websites and custom PHP themes for diverse clients.",
      "Implemented responsive frontend designs from mockups using HTML5, CSS3, and JavaScript (jQuery).",
      "Performed website maintenance, bug-fixing, and content updates, ensuring 99% uptime for client sites.",
      "Gained foundational experience with version control systems (Git) and collaborative development workflows."
    ],
  },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t('about.title')} icon={User}>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12 items-start">
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

        <div className="space-y-8 lg:mt-0">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">{t('about.skillsTitle')}</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="text-sm px-3 py-1.5 shadow-sm hover:shadow-md transition-shadow cursor-default">
                  {skill.icon && <skill.icon className="h-4 w-4 mr-2 text-primary" />}
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
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

