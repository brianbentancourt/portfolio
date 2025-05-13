"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Briefcase, User, Wand2, Mail, MountainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('header.about'), href: "#about", icon: User },
    { label: t('header.projects'), href: "#projects", icon: Briefcase },
    { label: t('header.optimizer'), href: "#optimizer", icon: Wand2 },
    { label: t('header.contact'), href: "#contact", icon: Mail },
  ];
  
  const NavLink = ({ href, children, onClick, className }: { href: string, children: React.ReactNode, onClick?: () => void, className?: string }) => (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium text-foreground/80 hover:text-primary transition-colors",
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
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">{t('header.title')}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
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
                       <MountainIcon className="h-6 w-6 text-primary" />
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
