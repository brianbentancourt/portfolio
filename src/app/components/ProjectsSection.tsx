"use client";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "./ProjectCard";
import type { ProjectType } from "@/lib/types";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample projects data remains in English. Full i18n would require translating this data.
const sampleProjects: ProjectType[] = [
  {
    id: "proj1",
    title: "AI-Powered Task Manager",
    description: "A smart task management application that uses AI to prioritize and suggest tasks.",
    longDescription: "This advanced task manager leverages natural language processing to understand task context and AI algorithms to predict urgency and optimal completion times. Features include intelligent scheduling, progress tracking, and collaborative workspaces. Built with Next.js for the frontend, Python (FastAPI) for the AI backend, and PostgreSQL for data storage.",
    imageUrl: "https://picsum.photos/seed/taskmanager/600/400",
    tags: ["Next.js", "Python", "AI/ML", "PostgreSQL", "Tailwind CSS"],
    liveLink: "#",
    sourceLink: "https://github.com",
  },
  {
    id: "proj2",
    title: "Artisan E-commerce Platform",
    description: "An online marketplace connecting local artisans with customers worldwide.",
    longDescription: "A full-featured e-commerce solution designed to empower artisans. Includes vendor dashboards, product management, secure payment gateway integration (Stripe), and a review system. The platform emphasizes beautiful product presentation and ease of use for both sellers and buyers. Developed using React, Node.js (Express), and MongoDB.",
    imageUrl: "https://picsum.photos/seed/ecommerce/600/400",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Material UI"],
    liveLink: "#",
    sourceLink: "https://github.com",
  },
  {
    id: "proj3",
    title: "Interactive Data Visualization Tool",
    description: "A web-based tool for creating and sharing interactive charts and dashboards.",
    longDescription: "This tool allows users to upload datasets, choose from various chart types, customize visualizations, and embed them in websites or reports. It's built with D3.js for powerful data rendering, Vue.js for a reactive user interface, and Firebase for real-time data synchronization and hosting.",
    imageUrl: "https://picsum.photos/seed/dataviz/600/400",
    tags: ["Vue.js", "D3.js", "Firebase", "Data Visualization", "Sass"],
    liveLink: "#",
  },
   {
    id: "proj4",
    title: "Personal Portfolio Website",
    description: "The very portfolio you are looking at, built with Next.js and ShadCN UI.",
    longDescription: "This portfolio website is a showcase of my skills and projects. It's built using Next.js 14 with the App Router, TypeScript for type safety, Tailwind CSS for styling, and ShadCN UI for pre-built accessible components. It also features a GenAI-powered text optimizer. The design focuses on a clean, modern aesthetic and a smooth user experience.",
    imageUrl: "https://picsum.photos/seed/portfolio/600/400",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "GenAI"],
    sourceLink: "https://github.com",
  },
];

export function ProjectsSection() {
  const { t } = useLanguage();
  return (
    <Section id="projects" title={t('projectsSection.title')} icon={Briefcase} className="bg-muted/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
