
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Briefcase, User, Mail, GraduationCap, Award, MessageSquare } from "lucide-react"; // Removed MountainIcon
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* B letter paths for outline */}
    <path d="M6 18V6h4a4 4 0 0 1 0 8H6" /> {/* Path for the top part of B */}
    <path d="M6 12h5a4 4 0 0 1 0 8H6" /> {/* Path for the bottom part of B */}
    {/* Slash symbol */}
    <line x1="15" y1="7" x2="19" y2="17" />
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
          <BrianLogoIcon className="h-6 w-6 text-primary" /> {/* Replaced MountainIcon */}
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
                       <BrianLogoIcon className="h-6 w-6 text-primary" /> {/* Replaced MountainIcon */}
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
