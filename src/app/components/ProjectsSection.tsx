
"use client";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "./ProjectCard";
import type { ProjectType } from "@/lib/types";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleProjects: ProjectType[] = [
  {
    id: "proj_agustyle",
    title: "Agustyle Barbershop System",
    description: "System for managing reservations in a barbershop.",
    longDescription: `Agustyle barbershop streamlined its appointment booking process by implementing an online system. This user-friendly platform allows clients to effortlessly view available time slots and secure their appointments by registering through their Facebook or Google accounts, simplifying the onboarding process. 
Key features include:
- Social Login: Quick and easy registration/login using Facebook or Google.
- Real-time Availability: Clients see up-to-date appointment slots.
- Admin Management Panel: Administrators have full control to manage, modify, or cancel appointments as needed.
- Calendar Integration: Clients can add confirmed bookings as reminders to their personal calendars with a single click.
This digital solution has significantly improved scheduling consistency throughout the month, leading to a notable increase in reservations. It has optimized operational efficiency for the barbershop while enhancing the booking experience for its clientele.`,
    imageUrl: "https://placehold.co/600x400.png", // From CV, original: agustyle.com
    tags: ["Web Application", "Booking System", "PHP", "MySQL", "Social Login"],
    liveLink: "https://agustyle.com/",
    sourceLink: "github.com/brianbentancourt", // Assuming same repo for all
    imageAiHint: "barbershop booking",
  },
  {
    id: "proj_foodstore",
    title: "Food Store System",
    description: "Order management system, products, delivery drivers, and cash register, significantly improving each internal process of the company.",
    longDescription: `A comprehensive web system designed to revolutionize fast food preparation and delivery operations. The system caters to distinct roles for kitchen staff, delivery personnel, and administrators, ensuring a seamless workflow from order placement to final delivery.
Key features:
- Google Account Integration for customer registration.
- Online purchasing and real-time order tracking.
- Automated stock control.
- Customer engagement features like raffles.
- Geospatial order visualization for admins and delivery.
- Real-time delivery wallet and advanced reporting.
Following its success, a new client began using the system in 2023.`,
    imageUrl: "https://placehold.co/600x400.png", // From CV, original: foodstoreuy.web.app
    tags: ["Web System", "Food Delivery", "Order Management", "React", "Firebase", "Real-time"],
    liveLink: "https://foodstoreuy.web.app/",
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "food delivery app",
    clientImplementations: [
      { name: "Burger House", link: "https://burgerhouseuy.com/" },
      { name: "Befe Burgers", link: "https://befeburgers.com/" },
      { name: "Pio Pio", link: "https://piopio-paysandu.web.app/", status: "In business process" },
    ],
  },
  {
    id: "proj_trans_villasboas",
    title: "Transportes Villasboas",
    description: "System for managing clients, trips, and truck maintenance.",
    longDescription: "A dedicated web application for Transportes Villasboas, designed to streamline their operations. This system provides comprehensive tools for managing client information, tracking trips, and scheduling truck maintenance. It aims to improve efficiency and organization within the transport company.",
    imageUrl: "https://placehold.co/600x400.png", // From CV, original: transportesvillasboas.web.app
    tags: ["Web Application", "Logistics", "Fleet Management", "Client Management"],
    liveLink: "https://transportesvillasboas.web.app",
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "truck logistics",
  },
  {
    id: "proj_chenlo_seguros",
    title: "Chenlo Seguros",
    description: "Website for Mapfre insurance broker, displaying their products and facilitating communication between the client and the seller.",
    longDescription: "A professional website developed for Chenlo Seguros, a Mapfre insurance broker. The site showcases various insurance products offered and serves as a communication hub to connect clients with the seller, facilitating inquiries and information sharing.",
    imageUrl: "https://placehold.co/600x400.png", // From CV, original: chenloseguros.com
    tags: ["Website", "Insurance", "Lead Generation", "Communication"],
    liveLink: "https://chenloseguros.com",
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "insurance website",
  },
  {
    id: "proj_electrica_caporale",
    title: "Eléctrica Caporale",
    description: "Store for lighting and electrical products that features user registration authenticated with social networks, as well as a points accumulation system for purchases.",
    longDescription: "An e-commerce platform for Eléctrica Caporale, specializing in lighting and electrical products. Key features include user registration with social media accounts (social login) and a loyalty points system to reward customers for their purchases, enhancing customer engagement and retention.",
    imageUrl: "https://placehold.co/600x400.png", // From CV, original: electricacaporale.com
    tags: ["E-commerce", "Retail", "Social Login", "Loyalty Program"],
    liveLink: "https://electricacaporale.com",
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "electrical store online",
  },
  {
    id: "proj_portfolio",
    title: "Personal Portfolio Website",
    description: "The very portfolio you are looking at, built with Next.js and ShadCN UI.",
    longDescription: `This portfolio website, the very platform you are currently exploring, serves as a dynamic showcase of my skills, projects, and professional journey. It's meticulously built using cutting-edge technologies:
- Next.js 14 with App Router: For optimal performance, server-side rendering, and efficient routing.
- TypeScript: Ensuring type safety and maintainable code.
- Tailwind CSS: For a utility-first approach to styling, resulting in a clean and responsive design.
- ShadCN UI: Leveraging pre-built, accessible, and customizable React components.
- GenAI Integration: Features an AI-powered chatbot for interactive Q&A.
- i18n Support: Fully internationalized for English and Spanish users.
The design prioritizes a clean, modern aesthetic, intuitive navigation, and a seamless user experience across all devices. It aims to provide a comprehensive overview of my capabilities and how I approach software development.`,
    imageUrl: "https://placehold.co/600x400.png", // Placeholder, as it's this site
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "GenAI", "i18n"],
    sourceLink: "github.com/brianbentancourt", // Link to this portfolio's repo
    imageAiHint: "website design portfolio",
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
