
"use client";
import { Github, Linkedin, Twitter, Share2 } from "lucide-react"; // Added Share2
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import * as React from "react";
import { Button } from "@/components/ui/button"; // Added Button
import { useToast } from "@/hooks/use-toast"; // Added useToast

export function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast(); // Initialize useToast
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: t('footer.shareDefaultText', { fallback: "Check out Brian Bentancourt's portfolio!" }),
      url: window.location.href,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        // Optional: toast for successful native share if desired
        // toast({
        //   title: t('footer.shareSuccessTitle', { fallback: "Shared successfully!" }),
        // });
      } catch (err) {
        console.error("Error sharing:", err);
        // Display a toast message if navigator.share() fails
        toast({
          variant: "destructive",
          title: t('footer.shareErrorTitle', { fallback: "Sharing Error" }),
          description: t('footer.shareErrorDescription', { fallback: "Could not share the link at this time."}),
        });
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: t('footer.linkCopiedSuccessTitle', { fallback: "Link Copied!" }),
          description: t('footer.linkCopiedSuccessDescription', { fallback: "The portfolio link has been copied to your clipboard."}),
        });
      } catch (err) {
        console.error("Failed to copy link:", err);
        toast({
          variant: "destructive",
          title: t('footer.linkCopiedErrorTitle', { fallback: "Copy Failed" }),
          description: t('footer.linkCopiedErrorDescription', { fallback: "Could not copy the link to your clipboard."}),
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: t('footer.shareNotSupportedTitle', { fallback: "Feature Not Supported" }),
        description: t('footer.shareNotSupportedDescription', { fallback: "Your browser doesn't support this sharing feature. Please copy the URL manually."}),
      });
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright', { replacements: { year: currentYear } })}
        </p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Button variant="ghost" size="icon" onClick={handleShare} aria-label={t('footer.shareAriaLabel', { fallback: 'Share this portfolio' })}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Link href="https://github.com/brianbentancourt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com/in/brianbentancourt" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
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

