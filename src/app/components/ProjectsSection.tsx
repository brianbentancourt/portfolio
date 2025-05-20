
"use client";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "./ProjectCard";
import type { ProjectType } from "@/lib/types";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProjectsSection() {
  const { t } = useLanguage();

  const sampleProjects: ProjectType[] = [
    {
      id: "proj_agustyle",
      title: t('projects.proj_agustyle.title'),
      description: t('projects.proj_agustyle.description'),
      longDescription: t('projects.proj_agustyle.longDescription'),
      imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Web Application", "Booking System", "PHP", "MySQL", "Social Login", "MercadoPago"],
      liveLink: "https://agustyle.com/",
      sourceLink: "https://github.com/brianbentancourt/agustyle",
      imageAiHint: "barber tools",
    },
    {
      id: "proj_foodstore",
      title: t('projects.proj_foodstore.title'),
      description: t('projects.proj_foodstore.description'),
      longDescription: t('projects.proj_foodstore.longDescription'),
      imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Web System", "Food Delivery", "Order Management", "React", "Firebase", "Real-time"],
      liveLink: "https://foodstoreuy.web.app/",
      sourceLink: "https://github.com/brianbentancourt/foodstore",
      imageAiHint: "pizza delivery app",
      clientImplementations: [
        { name: "Burger House", link: "https://burgerhouseuy.com/" },
        { name: "Befe Burgers", link: "https://befeburgers.com/" },
        { name: "Pio Pio", link: "https://piopio-paysandu.web.app/", status: t('projects.proj_foodstore.clientImplementations.pioPioStatus') },
      ],
    },
    {
      id: "proj_trans_villasboas",
      title: t('projects.proj_trans_villasboas.title'),
      description: t('projects.proj_trans_villasboas.description'),
      longDescription: t('projects.proj_trans_villasboas.longDescription'),
      imageUrl: "https://images.unsplash.com/photo-1492168732976-2676c584c675?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Web Application", "Logistics", "Fleet Management", "Client Management"],
      liveLink: "https://transportesvillasboas.web.app",
      sourceLink: "https://github.com/brianbentancourt/transportes-villasboas",
      imageAiHint: "truck highway",
    },
    {
      id: "proj_chenlo_seguros",
      title: t('projects.proj_chenlo_seguros.title'),
      description: t('projects.proj_chenlo_seguros.description'),
      longDescription: t('projects.proj_chenlo_seguros.longDescription'),
      imageUrl: "https://www.sau.org.uy/wp-content/uploads/portada_mapfre.jpg",
      tags: ["Website", "Insurance", "Lead Generation", "Communication"],
      liveLink: "https://chenloseguros.com",
      sourceLink: "https://github.com/brianbentancourt/chenlo-seguros",
      imageAiHint: "insurance logo",
    },
    {
      id: "proj_electrica_caporale",
      title: t('projects.proj_electrica_caporale.title'),
      description: t('projects.proj_electrica_caporale.description'),
      longDescription: t('projects.proj_electrica_caporale.longDescription'),
      imageUrl: "https://images.unsplash.com/photo-1513518647365-91830a8800b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["E-commerce", "Retail", "Social Login", "Loyalty Program"],
      liveLink: "https://electricacaporale.com",
      sourceLink: "https://github.com/brianbentancourt/electrica-caporale",
      imageAiHint: "lighting store interior",
    },
    {
      id: "proj_portfolio",
      title: t('projects.proj_portfolio.title'),
      description: t('projects.proj_portfolio.description'),
      longDescription: t('projects.proj_portfolio.longDescription'),
      imageUrl: "/img/brian_portfolio.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "GenAI", "i18n"],
      liveLink: "https://brianbentancourt.com",
      sourceLink: "https://github.com/brianbentancourt/portfolio-nextjs-shadcn-genai",
      imageAiHint: "website design portfolio",
    },
    {
      id: "proj_gestion_interna_estudio_juridico",
      title: t('projects.proj_gestion_interna_estudio_juridico.title'),
      description: t('projects.proj_gestion_interna_estudio_juridico.description'),
      longDescription: t('projects.proj_gestion_interna_estudio_juridico.longDescription'),
      imageUrl: "https://placehold.co/600x400.png",
      tags: [".NET", "SQL Server", "WinForms", "DevExpress"],
      liveLink: "", 
      sourceLink: "https://github.com/brianbentancourt/gestion-interna-estudio-juridico",
      imageAiHint: "law firm office",
    },
    {
      id: "proj_sistema_turnos_mutualista",
      title: t('projects.proj_sistema_turnos_mutualista.title'),
      description: t('projects.proj_sistema_turnos_mutualista.description'),
      longDescription: t('projects.proj_sistema_turnos_mutualista.longDescription'),
      imageUrl: "https://placehold.co/600x400.png",
      tags: [".NET", "SQL Server", "Web API", "React"],
      liveLink: "", 
      sourceLink: "https://github.com/brianbentancourt/sistema-turnos-mutualista",
      imageAiHint: "medical clinic reception",
    },
    {
      id: "proj_mantenimiento_evolutivo_prosegur",
      title: t('projects.proj_mantenimiento_evolutivo_prosegur.title'),
      description: t('projects.proj_mantenimiento_evolutivo_prosegur.description'),
      longDescription: t('projects.proj_mantenimiento_evolutivo_prosegur.longDescription'),
      imageUrl: "https://placehold.co/600x400.png",
      tags: [".NET", "SQL Server", "JavaScript", "Internal Systems"],
      liveLink: "", 
      sourceLink: "", 
      imageAiHint: "security systems tech",
    },
    {
      id: "proj_tarjeta_credito_oca",
      title: t('projects.proj_tarjeta_credito_oca.title'),
      description: t('projects.proj_tarjeta_credito_oca.description'),
      longDescription: t('projects.proj_tarjeta_credito_oca.longDescription'),
      imageUrl: "https://placehold.co/600x400.png",
      tags: [".NET", "SQL Server", "Financial Systems"],
      liveLink: "", 
      sourceLink: "", 
      imageAiHint: "credit card payment",
    },
    {
      id: "proj_sistema_financiero_peru_uruguay",
      title: t('projects.proj_sistema_financiero_peru_uruguay.title'),
      description: t('projects.proj_sistema_financiero_peru_uruguay.description'),
      longDescription: t('projects.proj_sistema_financiero_peru_uruguay.longDescription'),
      imageUrl: "https://placehold.co/600x400.png",
      tags: [".NET", "SQL Server", "Banking", "Financial Software"],
      liveLink: "", 
      sourceLink: "", 
      imageAiHint: "bank building modern",
    },
    {
      id: "proj_app_mobile_xamarin_actualred",
      title: t('projects.proj_app_mobile_xamarin_actualred.title'),
      description: t('projects.proj_app_mobile_xamarin_actualred.description'),
      longDescription: t('projects.proj_app_mobile_xamarin_actualred.longDescription'),
      imageUrl: "https://placehold.co/600x400.png",
      tags: ["Xamarin", "Mobile Development", "C#", ".NET"],
      liveLink: "", 
      sourceLink: "", 
      imageAiHint: "mobile app interface",
    },
  ];

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

    