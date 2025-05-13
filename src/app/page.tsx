"use client"; // Ensure HomePage can use client components like ChatbotWidget if needed by providers
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { AiOptimizerSection } from "./components/AiOptimizerSection";
import { ContactSection } from "./components/ContactSection";
import { ChatbotWidget } from "./components/ChatbotWidget";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AiOptimizerSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
