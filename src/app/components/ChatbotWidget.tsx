
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

const staticPortfolioContextEN = \`
Brian Bentancourt is a passionate and results-driven software developer based in Uruguay.
Contact: Yapeyú 1644, Paysandú, Uruguay | +59897313415 | brianbentancourt.com | brianbentancourt9@gmail.com
Profiles: LinkedIn (linkedin.com/in/brianbentancourt) | GitHub (github.com/brianbentancourt) | Platzi (platzi.com/@brianbentancourt)

About:
As a software developer, I'm excited to see the world moving towards AI, and it's a direction I would like to follow. I work to create innovative and efficient solutions that meet client needs and follow new industry trends. I focus on good coding practices and improving user experience to deliver high-quality products that meet and go beyond the expectations of end users. My desire to learn and improve has helped me stay updated, especially in the field of AI, and I am eager to bring this passion and experience to support your organization's success.

Skills:
- JavaScript: 8 years
- Google Cloud: 7 years
- .Net: 8 years
- SQL Server: 8 years
- Node.js: 7 years
- React.js: 7 years
- Firebase: 7 years
- Git: 7 years
- PowerBI: 3 years
- React Native: 1 year
- Next.js: 1 year
- Python: 1 year
- Github Copilot: 1 year
- Watsonx: 1 year
- Scikit-learn: 1 year

Experience:
1. Senior Software Developer - SONDA (Since 06/2022)
   - Full stack development and team mentoring.
2. Software Developer - De Larrobla & Asociados (01/2021 - 06/2022)
   - Working on financial systems for banks in Peru and Uruguay.
3. Software Developer - Actualred (09/2016 - 12/2020)
   - Developing for a primary project and collaborating on other company projects.
   - Self-training to improve programming skills.
   - Successfully launched the company's first mobile application for a major client. Developed with Xamarin.
   - Expert in customer service with excellent problem-solving abilities and effective production system organization.
4. Service Desk - Urudata S.A. (10/2014 - 09/2016)
   - Working in a large team, providing support in networks, printers, user access to platforms, automated backups, incident resolution through ticketing platform.

Education:
- Programmer Analyst - CTC ORT (Completed 12/2017)
- Courses and careers: See brianbentancourt.com/courses
- Bachillerato Tecnológico Informático - Informática ITSP (Completed 12/2012)

Freelance Projects:
- Agustyle (agustyle.com): System for managing reservations in a barbershop. Agustyle barbershop streamlined its appointment booking process by implementing an online system. Clients can now easily view available time slots and book appointments by registering through Facebook or Google. Administrators have the ability to manage and cancel appointments as needed, and clients can add reminders to their personal calendars upon booking. This solution has resulted in a more consistent schedule throughout the month and a significant increase in reservations, optimizing scheduling efficiency for both the barbershop and its clientele.
- Transportes Villasboas (transportesvillasboas.web.app): System for managing clients, trips, and truck maintenance.
- Food Store (foodstoreuy.web.app): Order management system, products, delivery drivers, and cash register, significantly improving each internal process of the company. A web system has been developed with the aim of improving the process of fast food preparation and delivery. The system encompasses various roles for kitchen, delivery, and administration. Its implementation arose from the overwhelming influx of orders experienced by a local company. The system significantly aided in streamlining and expediting the delivery process, ensuring prompt service to customers in record time. Some of the main features of the system include: Customer registration through Google accounts. Online purchases for convenient ordering. Real-time order tracking. Automatic stock control to maintain inventory levels. Raffles for registered customers as an additional incentive. Visualization of orders on a map by administrators and delivery personnel. Real-time wallet for deliveries. Charts and reports generation to analyze sales and average delivery times. Following its remarkable success, in 2023, a new client from a different location began utilizing the system. Client Implementations: Burger House (burgerhouseuy.com), Befe Burgers (befeburgers.com), Pio Pio (piopio-paysandu.web.app - In business process).
- Chenlo Seguros (chenloseguros.com): Website for Mapfre insurance broker, displaying their products and facilitating communication between the client and the seller.
- Eléctrica Caporale (electricacaporale.com): Store for lighting and electrical products that features user registration authenticated with social networks, as well as a points accumulation system for purchases.
- Personal Portfolio Website (this site): Showcases skills and projects. Built with Next.js, TypeScript, Tailwind CSS, ShadCN UI, GenAI chatbot.
\`;

const staticPortfolioContextES = \`
Brian Bentancourt es un desarrollador de software apasionado y orientado a resultados, radicado en Uruguay.
Contacto: Yapeyú 1644, Paysandú, Uruguay | +59897313415 | brianbentancourt.com | brianbentancourt9@gmail.com
Perfiles: LinkedIn (linkedin.com/in/brianbentancourt) | GitHub (github.com/brianbentancourt) | Platzi (platzi.com/@brianbentancourt)

Sobre Mí:
Como desarrollador de software, me entusiasma ver cómo el mundo avanza hacia la IA, y es una dirección que me gustaría seguir. Trabajo para crear soluciones innovadoras y eficientes que satisfagan las necesidades del cliente y sigan las nuevas tendencias de la industria. Me enfoco en buenas prácticas de codificación y en mejorar la experiencia del usuario para entregar productos de alta calidad que cumplan y superen las expectativas de los usuarios finales. Mi deseo de aprender y mejorar me ha ayudado a mantenerme actualizado, especialmente en el campo de la IA, y estoy ansioso por aportar esta pasión y experiencia para apoyar el éxito de su organización.

Habilidades:
- JavaScript: 8 años
- Google Cloud: 7 años
- .Net: 8 años
- SQL Server: 8 años
- Node.js: 7 años
- React.js: 7 años
- Firebase: 7 años
- Git: 7 años
- PowerBI: 3 años
- React Native: 1 año
- Next.js: 1 año
- Python: 1 año
- Github Copilot: 1 año
- Watsonx: 1 año
- Scikit-learn: 1 año

Experiencia:
1. Desarrollador de Software Senior - SONDA (Desde 06/2022)
   - Desarrollo full stack y mentoría de equipos.
2. Desarrollador de Software - De Larrobla & Asociados (01/2021 - 06/2022)
   - Trabajó en sistemas financieros para bancos en Perú y Uruguay.
3. Desarrollador de Software - Actualred (09/2016 - 12/2020)
   - Desarrollo para un proyecto principal y colaboración en otros proyectos de la empresa.
   - Autoformación para mejorar habilidades de programación.
   - Lanzó con éxito la primera aplicación móvil de la empresa para un cliente importante, desarrollada con Xamarin.
   - Experto en servicio al cliente con excelentes habilidades para resolver problemas y organización efectiva de sistemas de producción.
4. Mesa de Ayuda - Urudata S.A. (10/2014 - 09/2016)
   - Trabajó en un equipo grande, brindando soporte en redes, impresoras, acceso de usuarios a plataformas, copias de seguridad automatizadas y resolución de incidentes a través de plataforma de tickets.

Educación:
- Analista Programador - CTC ORT (Completado 12/2017)
- Cursos y carreras: Ver brianbentancourt.com/courses
- Bachillerato Tecnológico Informático - Informática ITSP (Completado 12/2012)

Proyectos Freelance:
- Agustyle (agustyle.com): Sistema para gestión de reservas en una barbería. La barbería Agustyle optimizó su proceso de reserva de citas implementando un sistema en línea. Los clientes ahora pueden ver fácilmente los horarios disponibles y reservar citas registrándose a través de Facebook o Google. Los administradores tienen la capacidad de gestionar y cancelar citas según sea necesario, y los clientes pueden agregar recordatorios a sus calendarios personales al reservar. Esta solución ha resultado en un horario más consistente durante todo el mes y un aumento significativo en las reservas, optimizando la eficiencia de la programación tanto para la barbería como para su clientela.
- Transportes Villasboas (transportesvillasboas.web.app): Sistema para gestión de clientes, viajes y mantenimiento de camiones.
- Food Store (foodstoreuy.web.app): Sistema de gestión de pedidos, productos, repartidores y caja registradora, mejorando significativamente cada proceso interno de la empresa. Se ha desarrollado un sistema web con el objetivo de mejorar el proceso de preparación y entrega de comida rápida. El sistema abarca varios roles para cocina, reparto y administración. Su implementación surgió de la abrumadora afluencia de pedidos experimentada por una empresa local. El sistema ayudó significativamente a agilizar y acelerar el proceso de entrega, asegurando un servicio rápido a los clientes en tiempo récord. Algunas de las principales características del sistema incluyen: Registro de clientes a través de cuentas de Google. Compras en línea para pedidos convenientes. Seguimiento de pedidos en tiempo real. Control automático de stock para mantener los niveles de inventario. Sorteos para clientes registrados como incentivo adicional. Visualización de pedidos en un mapa por administradores y personal de reparto. Billetera en tiempo real para entregas. Generación de gráficos e informes para analizar ventas y tiempos promedio de entrega. Tras su notable éxito, en 2023, un nuevo cliente de otra localidad comenzó a utilizar el sistema. Implementaciones en Clientes: Burger House (burgerhouseuy.com), Befe Burgers (befeburgers.com), Pio Pio (piopio-paysandu.web.app - En proceso de negocio).
- Chenlo Seguros (chenloseguros.com): Sitio web para corredor de seguros Mapfre, mostrando sus productos y facilitando la comunicación entre el cliente y el vendedor.
- Eléctrica Caporale (electricacaporale.com): Tienda de productos de iluminación y eléctricos que cuenta con registro de usuarios autenticado con redes sociales, así como un sistema de acumulación de puntos por compras.
- Sitio Web de Portafolio Personal (este sitio): Muestra habilidades y proyectos. Construido con Next.js, TypeScript, Tailwind CSS, ShadCN UI, chatbot con GenAI.
\`;

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
        setTimeout(() => {
          viewportElement.scrollTo({ top: viewportElement.scrollHeight, behavior: 'smooth' });
        }, 0);
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
