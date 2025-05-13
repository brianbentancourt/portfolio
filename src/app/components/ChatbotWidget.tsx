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
Brian Bentancourt is a passionate and results-driven software developer based in Montevideo, Uruguay.
He specializes in creating engaging and user-friendly digital experiences using modern web technologies and AI integration.

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python
- Design: Figma
- Other: AI Integration, RESTful APIs, MERN stack, MongoDB, PostgreSQL, WordPress, Git, Agile methodologies.

Experience:
1. Senior Frontend Developer - Tech Solutions Inc. (Jan 2021 - Present)
   - Led development of client-facing web applications using React and Next.js.
   - Collaborated with UX/UI designers to implement responsive and accessible interfaces.
   - Mentored junior developers and conducted code reviews.
   - Integrated AI-powered features for content personalization.
2. Full-Stack Developer - Web Innovators Co. (Jun 2018 - Dec 2020)
   - Developed and maintained full-stack applications using MERN stack.
   - Designed and implemented RESTful APIs for various services.
   - Contributed to database design and optimization (MongoDB).
   - Worked in an Agile environment, participating in sprint planning and retrospectives.
3. Junior Web Developer - Digital Creations Agency (Aug 2016 - May 2018)
   - Assisted in the development of WordPress websites and custom themes.
   - Implemented frontend designs using HTML, CSS, and JavaScript.
   - Performed website maintenance and bug fixes.
   - Gained experience with version control systems (Git).

Projects:
- AI-Powered Task Manager: A smart task management application that uses AI to prioritize and suggest tasks. Built with Next.js, Python (FastAPI), AI/ML, and PostgreSQL.
- Artisan E-commerce Platform: An online marketplace connecting local artisans with customers worldwide. Developed using React, Node.js (Express), MongoDB, and Stripe integration.
- Interactive Data Visualization Tool: A web-based tool for creating and sharing interactive charts and dashboards. Built with Vue.js, D3.js, and Firebase.
- Personal Portfolio Website (this site): Showcases skills and projects. Built with Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, and features a GenAI-powered text optimizer.

Contact: brian.bentancourt.dev@example.com
`;

const staticPortfolioContextES = `
Brian Bentancourt es un desarrollador de software apasionado y orientado a resultados, radicado en Montevideo, Uruguay.
Se especializa en crear experiencias digitales atractivas y fáciles de usar utilizando tecnologías web modernas e integración de IA.

Habilidades:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python
- Diseño: Figma
- Otras: Integración de IA, APIs RESTful, stack MERN, MongoDB, PostgreSQL, WordPress, Git, metodologías Agile.

Experiencia:
1. Desarrollador Frontend Senior - Tech Solutions Inc. (Ene 2021 - Presente)
   - Lideró el desarrollo de aplicaciones web para clientes usando React y Next.js.
   - Colaboró con diseñadores UX/UI para implementar interfaces responsivas y accesibles.
   - Mentorizó a desarrolladores junior y realizó revisiones de código.
   - Integró funciones personalizadas impulsadas por IA.
2. Desarrollador Full-Stack - Web Innovators Co. (Jun 2018 - Dic 2020)
   - Desarrolló y mantuvo aplicaciones full-stack usando el stack MERN.
   - Diseñó e implementó APIs RESTful para varios servicios.
   - Contribuyó al diseño y optimización de bases de datos (MongoDB).
   - Trabajó en un entorno Agile, participando en la planificación de sprints y retrospectivas.
3. Desarrollador Web Junior - Digital Creations Agency (Ago 2016 - May 2018)
   - Asistió en el desarrollo de sitios web de WordPress y temas personalizados.
   - Implementó diseños frontend usando HTML, CSS y JavaScript.
   - Realizó mantenimiento de sitios web y corrección de errores.
   - Adquirió experiencia con sistemas de control de versiones (Git).

Proyectos:
- Gestor de Tareas con IA: Una aplicación inteligente de gestión de tareas que utiliza IA para priorizar y sugerir tareas. Construida con Next.js, Python (FastAPI), IA/ML y PostgreSQL.
- Plataforma de E-commerce Artesanal: Un mercado en línea que conecta a artesanos locales con clientes de todo el mundo. Desarrollado con React, Node.js (Express), MongoDB e integración con Stripe.
- Herramienta Interactiva de Visualización de Datos: Una herramienta basada en web para crear y compartir gráficos y dashboards interactivos. Construida con Vue.js, D3.js y Firebase.
- Sitio Web de Portafolio Personal (este sitio): Muestra habilidades y proyectos. Construido con Next.js 14, TypeScript, Tailwind CSS, ShadCN UI y cuenta con un optimizador de texto impulsado por GenAI.

Contacto: brian.bentancourt.dev@example.com
`;


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useLanguage();

  const portfolioContext = locale === 'es' ? staticPortfolioContextES : staticPortfolioContextEN;
  const chatbotName = locale === 'es' ? "Asistente de Brian" : "Brian's Assistant";
  const welcomeMessage = locale === 'es' ? '¡Hola! Soy el asistente virtual de Brian. ¿En qué puedo ayudarte sobre su perfil o proyectos?' : "Hi there! I'm Brian's virtual assistant. How can I help you today regarding his profile or projects?";
  const typingMessage = locale === 'es' ? 'Escribiendo...' : 'Typing...';
  const inputPlaceholder = locale === 'es' ? 'Escribe tu mensaje...' : 'Type your message...';
  const sendButtonSrText = locale === 'es' ? 'Enviar' : 'Send';
  const openChatSrText = locale === 'es' ? 'Abrir chat' : 'Open chat';
  const errorMessageText = locale === 'es' ? "Lo siento, ocurrió un error. Por favor, intenta de nuevo más tarde." : "Sorry, an error occurred. Please try again later.";


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'initial-bot-message', text: welcomeMessage, sender: 'bot' }]);
    }
  }, [isOpen, messages.length, welcomeMessage]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <Button
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
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
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
