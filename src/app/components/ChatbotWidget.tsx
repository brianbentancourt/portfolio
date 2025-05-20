
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

const staticPortfolioContextEN = `Brian Bentancourt is a passionate and results-driven software developer based in Uruguay.
Contact: Uruguay | +59897313415 | brianbentancourt.com | brianbentancourt9@gmail.com
Profiles: LinkedIn (linkedin.com/in/brianbentancourt) | GitHub (github.com/brianbentancourt) | Platzi (platzi.com/@brianbentancourt)

About:
As a software developer, I'm excited to see the world moving towards AI, and it's a direction I would like to follow. I work to create innovative and efficient solutions that meet client needs and follow new industry trends. I focus on good coding practices and improving user experience to deliver high-quality products that meet and go beyond the expectations of end users. My desire to learn and improve has helped me stay updated, especially in the field of AI, and I am eager to bring this passion and experience to support your organization's success.

Skills:
- Programming Languages: JavaScript (8 years, ES6+, TypeScript), Python (1 year), C# (.NET Framework & Core, 8 years), PHP
- Web Development: React.js (7 years), Next.js (1 year), Node.js (7 years, Express.js), HTML5, CSS3, Tailwind CSS, SASS/SCSS, jQuery
- Mobile Development: React Native (1 year), Xamarin
- Databases: SQL Server (8 years, T-SQL, Stored Procedures, Triggers), MySQL, Firebase (Firestore, Realtime Database, 7 years), MongoDB
- Cloud & DevOps: Google Cloud Platform (GCP, 7 years - App Engine, Cloud Functions, Firebase), Docker, Git (7 years), CI/CD
- AI & Machine Learning: Genkit, Google AI (Gemini), IBM Watsonx (1 year), Scikit-learn (1 year), GitHub Copilot (1 year), Basic understanding of LLMs and prompt engineering.
- Business Intelligence: Power BI (3 years, DAX, Data Modeling)
- Operating Systems: Windows, Linux
- Other Tools: Visual Studio, VS Code, Android Studio, Jira, Trello, Scrum methodology.

Experience:
1. Senior Software Developer - SONDA (06/2022 – Present) Montevideo, Uruguay
   - Full stack development focusing on .NET and JavaScript technologies.
   - Team mentoring and leading development efforts on key projects.
   - Maintenance and evolutionary development of systems for Prosegur.
2. Software Developer - De Larrobla & Asociados (01/2021 – 06/2022) Montevideo, Uruguay
   - Worked on critical financial systems for banking institutions in Peru and Uruguay.
   - Development of functionalities related to OCA credit card systems.
3. Software Developer - Actualred (09/2016 – 12/2020) Paysandú, Uruguay
   - Developed and maintained a primary ERP-like system for the company and its clients.
   - Collaborated on diverse company projects, enhancing skills in various technologies.
   - Successfully launched the company's first mobile application for a major client, developed with Xamarin.
   - Provided expert customer service with excellent problem-solving abilities.
4. Service Desk - Urudata S.A. (10/2014 – 09/2016) Montevideo, Uruguay
   - Provided IT support in networks, printers, user access, automated backups, and incident resolution.

Education:
- Programmer Analyst - Universidad ORT Uruguay, Montevideo (Completed 12/2017)
- Bachillerato Tecnológico Informático (Technical High School Diploma in Informatics) - ITSP, Paysandú (Completed 12/2012)
- Continuous Learning: Active on platforms like Platzi (platzi.com/@brianbentancourt), with numerous courses in web development, AI, cloud technologies, and more. For a detailed list, see brianbentancourt.com/courses.

Freelance Projects:
- Agustyle (agustyle.com): Barbershop reservation management system. Features social login, real-time availability, admin panel, and calendar integration. (PHP, MySQL)
- Food Store (foodstoreuy.web.app): Order management system for food businesses. Includes customer registration (Google), online purchasing, real-time tracking, stock control, raffles, map visualization, delivery wallet, and reporting. Client implementations: Burger House, Befe Burgers, Pio Pio. (React, Firebase)
- Transportes Villasboas (transportesvillasboas.web.app): System for managing clients, trips, and truck maintenance for a transport company.
- Chenlo Seguros (chenloseguros.com): Website for Mapfre insurance broker, showcasing products and facilitating client-seller communication.
- Eléctrica Caporale (electricacaporale.com): E-commerce store for lighting/electrical products with social login and a points accumulation system.
- Personal Portfolio Website (this site): Showcases skills and projects. Built with Next.js, TypeScript, Tailwind CSS, ShadCN UI, GenAI chatbot, i18n.
- Law Firm Internal Management System: Desktop system for case, client, deadline, and billing management. (.NET, SQL Server, WinForms, DevExpress)
- Healthcare Provider Appointment System: Web system for managing medical appointments, patient records, and doctor schedules. (.NET, SQL Server, Web API, React)
`;

const staticPortfolioContextES = `Brian Bentancourt es un desarrollador de software apasionado y orientado a resultados, radicado en Uruguay.
Contacto: Uruguay | +59897313415 | brianbentancourt.com | brianbentancourt9@gmail.com
Perfiles: LinkedIn (linkedin.com/in/brianbentancourt) | GitHub (github.com/brianbentancourt) | Platzi (platzi.com/@brianbentancourt)

Sobre Mí:
Como desarrollador de software, me entusiasma ver cómo el mundo avanza hacia la IA, y es una dirección que me gustaría seguir. Trabajo para crear soluciones innovadoras y eficientes que satisfagan las necesidades del cliente y sigan las nuevas tendencias de la industria. Me enfoco en buenas prácticas de codificación y en mejorar la experiencia del usuario para entregar productos de alta calidad que cumplan y superen las expectativas de los usuarios finales. Mi deseo de aprender y mejorar me ha ayudado a mantenerme actualizado, especialmente en el campo de la IA, y estoy ansioso por aportar esta pasión y experiencia para apoyar el éxito de su organización.

Habilidades:
- Lenguajes de Programación: JavaScript (8 años, ES6+, TypeScript), Python (1 año), C# (.NET Framework & Core, 8 años), PHP
- Desarrollo Web: React.js (7 años), Next.js (1 año), Node.js (7 años, Express.js), HTML5, CSS3, Tailwind CSS, SASS/SCSS, jQuery
- Desarrollo Móvil: React Native (1 año), Xamarin
- Bases de Datos: SQL Server (8 años, T-SQL, Stored Procedures, Triggers), MySQL, Firebase (Firestore, Realtime Database, 7 años), MongoDB
- Cloud & DevOps: Google Cloud Platform (GCP, 7 años - App Engine, Cloud Functions, Firebase), Docker, Git (7 años), CI/CD
- IA & Machine Learning: Genkit, Google AI (Gemini), IBM Watsonx (1 año), Scikit-learn (1 año), GitHub Copilot (1 año), Comprensión básica de LLMs e ingeniería de prompts.
- Business Intelligence: Power BI (3 años, DAX, Modelado de Datos)
- Sistemas Operativos: Windows, Linux
- Otras Herramientas: Visual Studio, VS Code, Android Studio, Jira, Trello, Metodología Scrum.

Experiencia:
1. Desarrollador de Software Senior - SONDA (06/2022 – Presente) Montevideo, Uruguay
   - Desarrollo full stack enfocado en tecnologías .NET y JavaScript.
   - Mentoría de equipos y liderazgo en el desarrollo de proyectos clave.
   - Mantenimiento y desarrollo evolutivo de sistemas para Prosegur.
2. Desarrollador de Software - De Larrobla & Asociados (01/2021 – 06/2022) Montevideo, Uruguay
   - Trabajó en sistemas financieros críticos para instituciones bancarias en Perú y Uruguay.
   - Desarrollo de funcionalidades relacionadas con los sistemas de tarjetas de crédito OCA.
3. Desarrollador de Software - Actualred (09/2016 – 12/2020) Paysandú, Uruguay
   - Desarrolló y mantuvo un sistema principal tipo ERP para la empresa y sus clientes.
   - Colaboró en diversos proyectos de la empresa, mejorando habilidades en variadas tecnologías.
   - Lanzó con éxito la primera aplicación móvil de la empresa para un cliente importante, desarrollada con Xamarin.
   - Brindó servicio al cliente experto con excelentes habilidades para la resolución de problemas.
4. Mesa de Ayuda - Urudata S.A. (10/2014 – 09/2016) Montevideo, Uruguay
   - Brindó soporte de TI en redes, impresoras, acceso de usuarios, copias de seguridad automatizadas y resolución de incidentes.

Educación:
- Analista Programador - Universidad ORT Uruguay, Montevideo (Completado 12/2017)
- Bachillerato Tecnológico Informático - ITSP, Paysandú (Completado 12/2012)
- Aprendizaje Continuo: Activo en plataformas como Platzi (platzi.com/@brianbentancourt), con numerosos cursos en desarrollo web, IA, tecnologías en la nube y más. Para una lista detallada, ver brianbentancourt.com/courses.

Proyectos Freelance:
- Agustyle (agustyle.com): Sistema de gestión de reservas para barbería. Incluye inicio de sesión social, disponibilidad en tiempo real, panel de administración e integración de calendario. (PHP, MySQL)
- Food Store (foodstoreuy.web.app): Sistema de gestión de pedidos para negocios de comida. Incluye registro de clientes (Google), compras en línea, seguimiento en tiempo real, control de stock, sorteos, visualización en mapa, billetera para repartidores e informes. Implementaciones en clientes: Burger House, Befe Burgers, Pio Pio. (React, Firebase)
- Transportes Villasboas (transportesvillasboas.web.app): Sistema para gestión de clientes, viajes y mantenimiento de camiones para una empresa de transporte.
- Chenlo Seguros (chenloseguros.com): Sitio web para corredor de seguros Mapfre, mostrando productos y facilitando la comunicación cliente-vendedor.
- Eléctrica Caporale (electricacaporale.com): Tienda de comercio electrónico para productos de iluminación/eléctricos con inicio de sesión social y sistema de acumulación de puntos.
- Sitio Web de Portafolio Personal (este sitio): Muestra habilidades y proyectos. Construido con Next.js, TypeScript, Tailwind CSS, ShadCN UI, chatbot con GenAI, i18n.
- Sistema de Gestión Interna para Estudio Jurídico: Sistema de escritorio para gestión de casos, clientes, plazos y facturación. (.NET, SQL Server, WinForms, DevExpress)
- Sistema de Turnos para Mutualista: Sistema web para gestionar citas médicas, historias clínicas y horarios de médicos. (.NET, SQL Server, Web API, React)
`;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const renderMarkdownLinks = (text: string): string => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
};


export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLanguage(); 

  const portfolioContext = locale === 'es' ? staticPortfolioContextES : staticPortfolioContextEN;
  
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
        requestAnimationFrame(() => { // Using requestAnimationFrame for potentially smoother/more reliable scroll
          viewportElement.scrollTo({ top: viewportElement.scrollHeight, behavior: 'smooth' });
        });
      }
    }
  }, [messages]);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100); 
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
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <>
      <Button
        id="chatbot-trigger-button"
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
    

    

    

