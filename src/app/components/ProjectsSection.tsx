
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
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    tags: ["Web Application", "Booking System", "PHP", "MySQL", "Social Login"],
    liveLink: "https://agustyle.com/",
    sourceLink: "https://github.com/brianbentancourt/agustyle", 
    imageAiHint: "barber tools",
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
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    tags: ["Web System", "Food Delivery", "Order Management", "React", "Firebase", "Real-time"],
    liveLink: "https://foodstoreuy.web.app/",
    sourceLink: "https://github.com/brianbentancourt/foodstore",
    imageAiHint: "pizza delivery app",
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
    imageUrl: "https://images.unsplash.com/photo-1492168732976-2676c584c675?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    tags: ["Web Application", "Logistics", "Fleet Management", "Client Management"],
    liveLink: "https://transportesvillasboas.web.app",
    sourceLink: "https://github.com/brianbentancourt/transportes-villasboas",
    imageAiHint: "truck highway", 
  },
  {
    id: "proj_chenlo_seguros",
    title: "Chenlo Seguros",
    description: "Website for Mapfre insurance broker, displaying their products and facilitating communication between the client and the seller.",
    longDescription: "A professional website developed for Chenlo Seguros, a Mapfre insurance broker. The site showcases various insurance products offered and serves as a communication hub to connect clients with the seller, facilitating inquiries and information sharing.",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4be3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    tags: ["Website", "Insurance", "Lead Generation", "Communication"],
    liveLink: "https://chenloseguros.com",
    sourceLink: "https://github.com/brianbentancourt/chenlo-seguros",
    imageAiHint: "insurance consultant",
  },
  {
    id: "proj_electrica_caporale",
    title: "Eléctrica Caporale",
    description: "Store for lighting and electrical products that features user registration authenticated with social networks, as well as a points accumulation system for purchases.",
    longDescription: "An e-commerce platform for Eléctrica Caporale, specializing in lighting and electrical products. Key features include user registration with social media accounts (social login) and a loyalty points system to reward customers for their purchases, enhancing customer engagement and retention.",
    imageUrl: "https://images.unsplash.com/photo-1513518647365-91830a8800b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    tags: ["E-commerce", "Retail", "Social Login", "Loyalty Program"],
    liveLink: "https://electricacaporale.com",
    sourceLink: "https://github.com/brianbentancourt/electrica-caporale",
    imageAiHint: "lighting store interior",
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
    imageUrl: "/img/brian_portfolio.png", 
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "GenAI", "i18n"],
    liveLink: "https://brianbentancourt.com",
    sourceLink: "https://github.com/brianbentancourt/portfolio-nextjs-shadcn-genai", 
    imageAiHint: "website design portfolio",
  },
  {
    id: "proj_gestion_interna_estudio_juridico",
    title: "Internal Management System for Law Firm",
    description: "Comprehensive system for managing cases, clients, deadlines, and billing for a law firm.",
    longDescription: "This project involved developing a tailored internal management system for a law firm to optimize their daily operations. Key features include case tracking, client database management, automated deadline reminders, document management, and integrated billing functionalities. The system was built to ensure data security and provide an intuitive user interface for lawyers and administrative staff.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: [".NET", "SQL Server", "WinForms", "DevExpress"],
    liveLink: "", // Not publicly available
    sourceLink: "https://github.com/brianbentancourt/gestion-interna-estudio-juridico",
    imageAiHint: "law firm office",
  },
  {
    id: "proj_sistema_turnos_mutualista",
    title: "Appointment System for Healthcare Provider",
    description: "System for managing medical appointments, patient records, and doctor schedules.",
    longDescription: "Developed an appointment scheduling and management system for a healthcare provider (mutualista). This system allows patients to book appointments online, view doctor availability, and receive reminders. For the healthcare provider, it offers tools for managing patient records, doctor schedules, and a reporting module for administrative insights.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: [".NET", "SQL Server", "Web API", "React"],
    liveLink: "", // Not publicly available
    sourceLink: "https://github.com/brianbentancourt/sistema-turnos-mutualista",
    imageAiHint: "medical clinic reception",
  },
  {
    id: "proj_mantenimiento_evolutivo_prosegur",
    title: "Prosegur - Maintenance and System Evolution",
    description: "Maintenance and evolutionary development for Prosegur's internal systems.",
    longDescription: "As part of my work at SONDA, I contributed to the maintenance and evolutionary development of internal systems for Prosegur. This involved troubleshooting, implementing new features, and ensuring the stability and performance of critical applications used by the company.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: [".NET", "SQL Server", "JavaScript", "Internal Systems"],
    liveLink: "", // Internal system
    sourceLink: "", // Proprietary
    imageAiHint: "security systems tech",
  },
  {
    id: "proj_tarjeta_credito_oca",
    title: "OCA Credit Card - Systems Development",
    description: "Development of functionalities related to OCA credit card systems.",
    longDescription: "While at De Larrobla & Asociados, I was involved in developing functionalities for systems related to OCA, a major credit card issuer in Uruguay. This included working on various modules of their financial and transactional platforms.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: [".NET", "SQL Server", "Financial Systems"],
    liveLink: "", // Internal system
    sourceLink: "", // Proprietary
    imageAiHint: "credit card payment",
  },
  {
    id: "proj_sistema_financiero_peru_uruguay",
    title: "Financial Systems for Banks (Peru/Uruguay)",
    description: "Worked on financial systems for banks in Peru and Uruguay.",
    longDescription: "At De Larrobla & Asociados, I contributed to the development and maintenance of financial systems used by banking institutions in Peru and Uruguay. This involved understanding complex financial requirements and implementing robust and secure software solutions.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: [".NET", "SQL Server", "Banking", "Financial Software"],
    liveLink: "", // Internal systems
    sourceLink: "", // Proprietary
    imageAiHint: "bank building modern",
  },
  {
    id: "proj_app_mobile_xamarin_actualred",
    title: "Xamarin Mobile App for Major Client (Actualred)",
    description: "Successfully launched the company's first mobile application for a major client, developed with Xamarin.",
    longDescription: "During my time at Actualred, I led the development and successful launch of the company's first mobile application for one of its key clients. The application was built using Xamarin, providing a cross-platform solution. This project involved the full development lifecycle, from requirement gathering to deployment and post-launch support.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["Xamarin", "Mobile Development", "C#", ".NET"],
    liveLink: "", // Client-specific app
    sourceLink: "", // Proprietary
    imageAiHint: "mobile app interface",
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

