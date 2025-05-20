
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Briefcase, User, Mail, GraduationCap, Award, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Custom SVG Logo <B/>
const BrianLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Defines the coordinate system
    fill="currentColor" // The text color will be set by this
    stroke="none"       // No stroke for the text
    {...props} // Applies className (like h-6 w-6 text-primary), style, etc.
  >
    <text
      x="50%" // Center horizontally
      y="50%" // Center vertically (baseline)
      dy="0.35em" // Fine-tune vertical alignment of text
      textAnchor="middle" // Anchor the text at its horizontal center
      fontFamily="Consolas, 'Courier New', Courier, monospace" // Monospaced font
      fontSize="9.5" // Adjusted size to fit "<B/>" within icon dimensions
      fontWeight="600" // Bold
      // fill="currentColor" // Not strictly needed if SVG has it and text doesn't override, but good for clarity
    >
      &lt;B/&gt;
    </text>
  </svg>
);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('header.about'), href: "/#about", icon: User },
    { label: t('header.education'), href: "/#education", icon: GraduationCap },
    { label: t('header.projects'), href: "/#projects", icon: Briefcase },
    { label: t('header.chatbot'), href: "/#chatbot-intro", icon: MessageSquare }, 
    { label: t('header.diplomas'), href: "/diplomas", icon: Award },
    { label: t('header.contact'), href: "/#contact", icon: Mail },
  ];
  
  const NavLink = ({ href, children, onClick, className }: { href: string, children: React.ReactNode, onClick?: () => void, className?: string }) => (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:[text-shadow:0_0_8px_hsl(var(--primary)/0.7)] p-1 rounded-md",
        className
      )}
    >
      {children}
    </Link>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BrianLogoIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">{t('header.title')}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <ThemeSwitcher />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                       <BrianLogoIcon className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">{t('header.title')}</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-1 p-4">
                    {navItems.map((item) => (
                      <NavLink 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-lg py-3"
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
