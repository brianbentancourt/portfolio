"use client";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import * as React from "react";


export function Footer() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="border-t bg-card">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright', { year: currentYear })}
        </p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Link href="github.com/brianbentancourt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="linkedin.com/in/brianbentancourt" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
          {/* <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
