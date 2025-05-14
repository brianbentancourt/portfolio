
"use client";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ExternalLink, FileText } from "lucide-react";
import type { EducationEntryType } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

// User: Please replace the content of this array with your actual education and certifications.
const educationData: EducationEntryType[] = [
  {
    id: "edu_ort_analyst",
    title: "Analista Programador",
    institution: "Universidad ORT Uruguay",
    period: "2017 - 2020",
    description: "Graduated as a Programmer Analyst, acquiring a solid foundation in software development, algorithms, data structures, and database management. Completed various projects applying learned methodologies.",
    details: [
      "Object-Oriented Programming (Java, C#).",
      "Web Development (HTML, CSS, JavaScript, PHP).",
      "Database Design and SQL (MySQL, SQL Server).",
      "Software Engineering Principles and Agile Methodologies.",
    ],
    logoUrl: "https://picsum.photos/seed/ortlogo/60/60",
    logoAiHint: "university campus",
    certificateUrl: "/diplomas#analista-programador-ort", // Example link to a diploma on the diplomas page
  },
  {
    id: "edu_coderhouse_fullstack",
    title: "Full Stack Web Development",
    institution: "Coderhouse",
    period: "Mar 2021 - Jul 2021",
    description: "Intensive bootcamp focused on the MERN stack (MongoDB, Express.js, React, Node.js) and complementary technologies for building modern web applications.",
    details: [
      "React.js for frontend development, including hooks and state management.",
      "Node.js and Express.js for backend API development.",
      "MongoDB for NoSQL database interactions.",
      "Version control with Git and GitHub.",
    ],
    logoUrl: "https://picsum.photos/seed/coderhouselogo/60/60",
    logoAiHint: "coding bootcamp",
    certificateUrl: "/diplomas#fullstack-coderhouse",
  },
   {
    id: "edu_coderhouse_react",
    title: "React Development",
    institution: "Coderhouse",
    period: "Nov 2020 - Jan 2021",
    description: "Specialized course in React.js, diving deep into component-based architecture, state management, routing, and integration with APIs.",
    details: [
        "Advanced React concepts: Context API, Redux (basics).",
        "Building responsive user interfaces.",
        "Testing React components.",
        "Deployment strategies for React applications."
    ],
    logoUrl: "https://picsum.photos/seed/coderreactlogo/60/60",
    logoAiHint: "react logo",
    certificateUrl: "/diplomas#react-coderhouse",
  },
];

export function EducationSection() {
  const { t } = useLanguage();

  return (
    <Section id="education" title={t('educationSection.title')} icon={GraduationCap}>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        {t('educationSection.description')}
      </p>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {educationData.map((entry) => (
          <Card key={entry.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              {entry.logoUrl && (
                <Image
                  src={entry.logoUrl}
                  alt={`${entry.institution} logo`}
                  width={60}
                  height={60}
                  className="rounded-md object-contain"
                  data-ai-hint={entry.logoAiHint || "education logo"}
                />
              )}
              <div className="flex-1">
                <CardTitle className="text-xl text-primary">{entry.title}</CardTitle>
                <p className="text-sm font-medium text-foreground">{entry.institution}</p>
                <p className="text-xs text-muted-foreground">{entry.period}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {entry.description && <p className="text-muted-foreground mb-3">{entry.description}</p>}
              {entry.details && entry.details.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {entry.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </CardContent>
            {entry.certificateUrl && (
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href={entry.certificateUrl}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Certificate
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/diplomas">
            {t('educationSection.viewDiplomas')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

