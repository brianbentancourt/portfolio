
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Loader2, Bot } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { portfolioChatbot, PortfolioChatbotInput } from '@/ai/flows/portfolio-chatbot-flow';
import { useLanguage } from '@/contexts/LanguageContext';

// This context is a simplified representation. In a real app, derive this from a single source of truth.
const staticPortfolioContextEN = `
Brian Bentancourt is a passionate and results-driven software developer based in Uruguay.
He specializes in creating engaging and user-friendly digital experiences using modern web technologies and AI integration.

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python
- Design: Figma
- Other: AI Integration, RESTful APIs, MERN stack, MongoDB, PostgreSQL, WordPress, Git, Agile methodologies.

Experience:
1. Lead Full-Stack Engineer & AI Specialist - Innovatech Solutions / Freelance Consultant (March 2022 - Present)
   - Spearheaded the design and development of enterprise-level web applications, incorporating advanced AI/ML models for enhanced functionality.
   - Led cross-functional teams in agile environments, ensuring timely delivery of high-quality software products.
   - Consulted with clients to define technical requirements and deliver custom software solutions that meet business objectives.
   - Continuously researched and integrated emerging technologies to drive innovation and efficiency.
2. Senior Frontend Developer - Tech Solutions Inc. (Jan 2021 - Feb 2022)
   - Led development of high-performance, client-facing web applications using React, Next.js, and TypeScript.
   - Collaborated closely with UX/UI designers and product managers to implement responsive, accessible, and user-centric interfaces.
   - Mentored junior developers, conducted code reviews, and promoted best practices in frontend development, improving team velocity by 15%.
   - Pioneered the integration of AI-powered features for content personalization and recommendation engines, significantly improving user engagement metrics.
3. Full-Stack Developer - Web Innovators Co. (Jun 2018 - Dec 2020)
   - Developed and maintained full-stack applications using MERN stack (MongoDB, Express.js, React, Node.js).
   - Designed and implemented RESTful APIs for various microservices, ensuring scalability and reliability.
   - Contributed to database design and optimization (MongoDB), improving query performance by 25%.
   - Actively participated in an Agile development process, including sprint planning, daily stand-ups, and retrospectives.
4. Junior Web Developer - Digital Creations Agency (Aug 2016 - May 2018)
   - Assisted in the development of WordPress websites and custom PHP themes for diverse clients.
   - Implemented responsive frontend designs from mockups using HTML5, CSS3, and JavaScript (jQuery).
   - Performed website maintenance, bug-fixing, and content updates, ensuring 99% uptime for client sites.
   - Gained foundational experience with version control systems (Git) and collaborative development workflows.

Projects:
- AI-Powered Task Manager: A smart task management application that uses AI to prioritize and suggest tasks. Built with Next.js, Python (FastAPI), AI/ML, and PostgreSQL.
- Artisan E-commerce Platform: An online marketplace connecting local artisans with customers worldwide. Developed using React, Node.js (Express), MongoDB, and Stripe integration.
- Interactive Data Visualization Tool: A web-based tool for creating and sharing interactive charts and dashboards. Built with Vue.js, D3.js, and Firebase.
- Personal Portfolio Website (this site): Showcases skills and projects. Built with Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, and features a GenAI-powered text optimizer.
- Agustyle Barbershop Booking System: Streamlined appointment booking for Agustyle barbershop with an online system featuring social login (Facebook/Google) and calendar integration. Administrators can manage appointments, and clients can add reminders. Link: https://agustyle.com/
- Food Store System: A web system for fast food preparation and delivery with roles for kitchen, delivery, and admin. Features Google login, online purchasing, real-time order tracking, stock control, customer raffles, map visualization, real-time delivery wallet, and sales/delivery time reporting. Main system link: https://foodstoreuy.web.app/. Client Implementations: Burger House (https://burgerhouseuy.com/), Befe Burgers (https://befeburgers.com/), Pio Pio (In business process) (https://piopio-paysandu.web.app/).

Contact: brianbentancourt9@gmail.com,+59897313415
`;

const staticPortfolioContextES = `
Brian Bentancourt es un desarrollador de software apasionado y orientado a resultados, radicado en Uruguay.
Se especializa en crear experiencias digitales atractivas y fáciles de usar utilizando tecnologías web modernas e integración de IA.

Habilidades:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python
- Diseño: Figma
- Otras: Integración de IA, APIs RESTful, stack MERN, MongoDB, PostgreSQL, WordPress, Git, metodologías Agile.

Experiencia:
1. Ingeniero Full-Stack Principal y Especialista en IA - Innovatech Solutions / Consultor Freelance (Marzo 2022 - Presente)
   - Lideró el diseño y desarrollo de aplicaciones web a nivel empresarial, incorporando modelos avanzados de IA/ML para mejorar la funcionalidad.
   - Dirigió equipos multifuncionales en entornos ágiles, asegurando la entrega oportuna de productos de software de alta calidad.
   - Consultó con clientes para definir requisitos técnicos y entregar soluciones de software personalizadas que cumplan con los objetivos comerciales.
   - Investigó e integró continuamente tecnologías emergentes para impulsar la innovación y la eficiencia.
2. Desarrollador Frontend Senior - Tech Solutions Inc. (Ene 2021 - Feb 2022)
   - Lideró el desarrollo de aplicaciones web de alto rendimiento para clientes utilizando React, Next.js y TypeScript.
   - Colaboró estrechamente con diseñadores UX/UI y gerentes de producto para implementar interfaces responsivas, accesibles y centradas en el usuario.
   - Mentorizó a desarrolladores junior, realizó revisiones de código y promovió las mejores prácticas en el desarrollo frontend, mejorando la velocidad del equipo en un 15%.
   - Fue pionero en la integración de funciones impulsadas por IA para la personalización de contenido y motores de recomendación, mejorando significativamente las métricas de participación del usuario.
3. Desarrollador Full-Stack - Web Innovators Co. (Jun 2018 - Dic 2020)
   - Desarrolló y mantuvo aplicaciones full-stack utilizando el stack MERN (MongoDB, Express.js, React, Node.js).
   - Diseñó e implementó APIs RESTful para varios microservicios, asegurando escalabilidad y confiabilidad.
   - Contribuyó al diseño y optimización de bases de datos (MongoDB), mejorando el rendimiento de las consultas en un 25%.
   - Participó activamente en un proceso de desarrollo Agile, incluyendo la planificación de sprints, reuniones diarias y retrospectivas.
4. Desarrollador Web Junior - Digital Creations Agency (Ago 2016 - May 2018)
   - Asistió en el desarrollo de sitios web de WordPress y temas PHP personalizados para diversos clientes.
   - Implementó diseños frontend responsivos a partir de maquetas utilizando HTML5, CSS3 y JavaScript (jQuery).
   - Realizó mantenimiento de sitios web, corrección de errores y actualizaciones de contenido, asegurando un tiempo de actividad del 99% para los sitios de los clientes.
   - Adquirió experiencia fundamental con sistemas de control de versiones (Git) y flujos de trabajo de desarrollo colaborativo.

Proyectos:
- Gestor de Tareas con IA: Una aplicación inteligente de gestión de tareas que utiliza IA para priorizar y sugerir tareas. Construida con Next.js, Python (FastAPI), IA/ML y PostgreSQL.
- Plataforma de E-commerce Artesanal: Un mercado en línea que conecta a artesanos locales con clientes de todo el mundo. Desarrollado con React, Node.js (Express), MongoDB e integración con Stripe.
- Herramienta Interactiva de Visualización de Datos: Una herramienta basada en web para crear y compartir gráficos y dashboards interactivos. Construida con Vue.js, D3.js y Firebase.
- Sitio Web de Portafolio Personal (este sitio): Muestra habilidades y proyectos. Construido con Next.js 14, TypeScript, Tailwind CSS, ShadCN UI y cuenta con un optimizador de texto impulsado por GenAI.
- Sistema de Reservas para Barbería Agustyle: Agilizó la reserva de citas para la barbería Agustyle con un sistema en línea que incluye inicio de sesión social (Facebook/Google) e integración de calendario. Los administradores pueden gestionar citas y los clientes añadir recordatorios. Enlace: https://agustyle.com/
- Sistema Food Store: Un sistema web para la preparación y entrega de comida rápida con roles para cocina, reparto y administración. Incluye inicio de sesión con Google, compras en línea, seguimiento de pedidos en tiempo real, control de stock, sorteos para clientes, visualización de pedidos en mapa, billetera en tiempo real para repartidores y reportes de ventas/tiempos de entrega. Enlace principal del sistema: https://foodstoreuy.web.app/. Implementaciones en Clientes: Burger House (https://burgerhouseuy.com/), Befe Burgers (https://befeburgers.com/), Pio Pio (En proceso de negocio) (https://piopio-paysandu.web.app/).

Contacto: brianbentancourt9@gmail.com,+59897313415
`;


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// Function to convert Markdown links to HTML anchor tags
const renderMarkdownLinks = (text: string): string => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // Sanitize text before inserting to prevent XSS if it's not just links.
  // For this specific case, we assume the AI only produces markdown links or plain text.
  // A more robust solution would use a proper Markdown parser and sanitizer.
  return text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
};


export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLanguage(); // Destructure t here

  const portfolioContext = locale === 'es' ? staticPortfolioContextES : staticPortfolioContextEN;
  
  // Use t() for all text, ensuring fallback if keys are missing temporarily
  const chatbotName = t('chatbotWidget.chatbotName', { fallback: "Brian's Assistant" });
  const welcomeMessage = t('chatbotWidget.welcomeMessage', { fallback: "Hi there! I'm Brian's virtual assistant. How can I help you today regarding his profile or projects?" });
  const typingMessage = t('chatbotWidget.typingMessage', { fallback: 'Typing...' });
  const inputPlaceholder = t('chatbotWidget.inputPlaceholder', { fallback: 'Type your message...' });
  const sendButtonSrText = t('chatbotWidget.sendButtonSrText', { fallback: 'Send' });
  const openChatSrText = t('chatbotWidget.openChatSrText', { fallback: 'Open chat' });
  const errorMessageText = t('chatbotWidget.errorMessageText', { fallback: "Sorry, an error occurred. Please try again later." });


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'initial-bot-message', text: welcomeMessage, sender: 'bot' }]);
    }
  }, [isOpen, messages.length, welcomeMessage]);

  useEffect(() => {
    const scrollAreaElement = scrollAreaRef.current;
    if (scrollAreaElement) {
      const viewportElement = scrollAreaElement.children[0] as HTMLDivElement | undefined;
      if (viewportElement) {
        setTimeout(() => {
          viewportElement.scrollTo({ top: viewportElement.scrollHeight, behavior: 'smooth' });
        }, 0);
      }
    }
  }, [messages]);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100); // Delay focus slightly for transition
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const input: PortfolioChatbotInput = { userQuery: userMessage.text, portfolioContext };
      const result = await portfolioChatbot(input);
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: result.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessageText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Slight delay to ensure the new message is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <>
      <Button
        id="chatbot-trigger-button" // Added ID here
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-xl z-50 flex items-center justify-center"
        aria-label={openChatSrText}
      >
        <MessageSquare className="h-7 w-7" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md flex flex-col h-[calc(100vh-4rem)] sm:h-[70vh] max-h-[600px] p-0 shadow-2xl rounded-lg">
          <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-6 w-6 text-primary" />
              {chatbotName}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-grow p-4 bg-background/50" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <Avatar className="w-8 h-8 mr-2 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={18}/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'}`}>
                    <p 
                      className="text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: renderMarkdownLinks(msg.text) }}
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <Avatar className="w-8 h-8 mr-2 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={18}/>
                      </AvatarFallback>
                    </Avatar>
                  <div className="max-w-[75%] p-3 rounded-lg bg-card text-card-foreground flex items-center shadow-sm rounded-bl-none">
                    <Loader2 className="h-4 w-4 animate-spin mr-2 text-primary" />
                    <span className="text-sm">{typingMessage}</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-3 border-t bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                disabled={isLoading}
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={isLoading || inputValue.trim() === ''} aria-label={sendButtonSrText}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

