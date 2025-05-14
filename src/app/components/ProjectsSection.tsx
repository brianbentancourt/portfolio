
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
    longDescription: `This advanced task manager leverages natural language processing (NLP) to understand task context and sophisticated AI algorithms to predict urgency and optimal completion times. Key features include:
- **Intelligent Scheduling:** Automatically suggests task priorities and deadlines based on project goals and user workload.
- **NLP-driven Task Creation:** Users can create tasks using natural language, which the system parses and categorizes.
- **Progress Tracking & Analytics:** Visual dashboards provide insights into productivity, task completion rates, and potential bottlenecks.
- **Collaborative Workspaces:** Enables team members to share projects, assign tasks, and communicate effectively within the platform.
- **Personalized Suggestions:** AI learns user habits and project patterns to offer personalized recommendations for task management.
Built with Next.js for a responsive and dynamic frontend, Python (FastAPI) for the AI-powered backend services, and PostgreSQL for robust and scalable data storage.`,
    imageUrl: "https://picsum.photos/seed/taskmanager/600/400",
    tags: ["Next.js", "Python", "AI/ML", "PostgreSQL", "Tailwind CSS"],
    liveLink: "#",
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "task manager",
  },
  {
    id: "proj2",
    title: "Artisan E-commerce Platform",
    description: "An online marketplace connecting local artisans with customers worldwide.",
    longDescription: `A full-featured e-commerce solution meticulously designed to empower local artisans and connect them with a global customer base. The platform offers:
- **Dedicated Vendor Dashboards:** Artisans can easily manage their products, inventory, orders, and view sales analytics.
- **Comprehensive Product Management:** Supports various product types, custom options, and high-quality image galleries.
- **Secure Payment Gateway Integration:** Seamless and secure transactions powered by Stripe, supporting multiple currencies.
- **Community & Review System:** Fosters a vibrant community with customer reviews, ratings, and direct artisan-buyer communication channels.
- **Beautiful & Intuitive Design:** Emphasizes stunning product presentation and an exceptional user experience for both sellers and buyers.
The platform is developed using React for a rich frontend experience, Node.js (Express) for a scalable backend, and MongoDB for flexible data management.`,
    imageUrl: "https://picsum.photos/seed/ecommerce/600/400",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Material UI"],
    liveLink: "#",
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "e-commerce marketplace",
  },
  {
    id: "proj3",
    title: "Interactive Data Visualization Tool",
    description: "A web-based tool for creating and sharing interactive charts and dashboards.",
    longDescription: `A powerful web-based tool enabling users to transform complex datasets into insightful and interactive visualizations. Core functionalities include:
- **Versatile Data Upload:** Supports various data formats (CSV, Excel, JSON) for easy import.
- **Rich Chart Library:** Offers a wide selection of chart types, from basic bar and line charts to more complex scatter plots, heatmaps, and geographical maps.
- **Deep Customization:** Extensive options to customize colors, labels, axes, and interactive elements to match specific analytical needs or branding.
- **Embed & Share:** Generated visualizations can be easily embedded into websites, blogs, or reports, or shared via direct links.
- **Real-time Collaboration (with Firebase):** Allows multiple users to work on the same dashboard simultaneously.
Built with D3.js for unparalleled data rendering capabilities, Vue.js for a reactive and performant user interface, and Firebase for real-time data synchronization, authentication, and hosting.`,
    imageUrl: "https://picsum.photos/seed/dataviz/600/400",
    tags: ["Vue.js", "D3.js", "Firebase", "Data Visualization", "Sass"],
    liveLink: "#",
    imageAiHint: "data dashboard",
  },
   {
    id: "proj4",
    title: "Personal Portfolio Website",
    description: "The very portfolio you are looking at, built with Next.js and ShadCN UI.",
    longDescription: `This portfolio website, the very platform you are currently exploring, serves as a dynamic showcase of my skills, projects, and professional journey. It's meticulously built using cutting-edge technologies:
- **Next.js 14 with App Router:** For optimal performance, server-side rendering, and efficient routing.
- **TypeScript:** Ensuring type safety and maintainable code.
- **Tailwind CSS:** For a utility-first approach to styling, resulting in a clean and responsive design.
- **ShadCN UI:** Leveraging pre-built, accessible, and customizable React components.
- **GenAI Integration:** Features an AI-powered text optimizer to enhance content and a chatbot for interactive Q&A.
- **i18n Support:** Fully internationalized for English and Spanish users.
The design prioritizes a clean, modern aesthetic, intuitive navigation, and a seamless user experience across all devices. It aims to provide a comprehensive overview of my capabilities and how I approach software development.`,
    imageUrl: "https://picsum.photos/seed/portfolio/600/400",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "GenAI", "i18n"],
    sourceLink: "github.com/brianbentancourt",
    imageAiHint: "website design",
  },
  {
    id: "proj5",
    title: "Agustyle Barbershop Booking System",
    description: "Streamlined appointment booking for Agustyle barbershop with an online system featuring social login and calendar integration.",
    longDescription: `Agustyle barbershop streamlined its appointment booking process by implementing an online system. This user-friendly platform allows clients to effortlessly view available time slots and secure their appointments by registering through their Facebook or Google accounts, simplifying the onboarding process. 
Key features include:
- **Social Login:** Quick and easy registration/login using Facebook or Google.
- **Real-time Availability:** Clients see up-to-date appointment slots.
- **Admin Management Panel:** Administrators have full control to manage, modify, or cancel appointments as needed.
- **Calendar Integration:** Clients can add confirmed bookings as reminders to their personal calendars with a single click.
- **Automated Notifications:** (Optional, depending on implementation) Reminders for upcoming appointments.
This digital solution has significantly improved scheduling consistency throughout the month, leading to a notable increase in reservations. It has optimized operational efficiency for the barbershop while enhancing the booking experience for its clientele.`,
    imageUrl: "https://picsum.photos/seed/agustyle/600/400",
    tags: ["Online Booking", "Facebook Login", "Google Login", "Calendar Integration", "Admin Panel", "PHP", "MySQL"],
    liveLink: "https://agustyle.com/",
    imageAiHint: "barbershop booking",
  },
  {
    id: "proj6",
    title: "Food Store System",
    description: "A web system developed to improve fast food preparation and delivery, encompassing roles for kitchen, delivery, and administration.",
    longDescription: `A comprehensive web system designed to revolutionize fast food preparation and delivery operations. The system caters to distinct roles for kitchen staff, delivery personnel, and administrators, ensuring a seamless workflow from order placement to final delivery. Its development was driven by the need to manage an overwhelming influx of orders for a local business, and it has proven instrumental in streamlining processes and ensuring prompt customer service.

Key features of the Food Store System include:
- **Google Account Integration:** Easy customer registration and login.
- **Online Purchasing:** Convenient and user-friendly interface for placing orders.
- **Real-time Order Tracking:** Customers and administrators can monitor order status live.
- **Automated Stock Control:** Helps maintain optimal inventory levels and prevent shortages.
- **Customer Engagement:** Features like raffles for registered customers to enhance loyalty.
- **Geospatial Order Visualization:** Administrators and delivery personnel can view order locations on a map for efficient routing.
- **Real-time Delivery Wallet:** Tracks earnings and transactions for delivery personnel.
- **Advanced Reporting:** Generates charts and reports on sales, average delivery times, and other key performance indicators.

Following its remarkable success, in 2023, a new client from a different location began utilizing the system.

**Client Implementations:**
- Burger House: [https://burgerhouseuy.com/](https://burgerhouseuy.com/)
- Befe Burgers: [https://befeburgers.com/](https://befeburgers.com/)
- Pio Pio (In business process): [https://piopio-paysandu.web.app/](https://piopio-paysandu.web.app/)`,
    imageUrl: "https://picsum.photos/seed/foodstore/600/400",
    tags: ["Web System", "Food Delivery", "Order Management", "Google Login", "Real-time Tracking", "Stock Control", "Reporting", "React", "Firebase"],
    liveLink: "https://foodstoreuy.web.app/",
    imageAiHint: "food delivery system",
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

