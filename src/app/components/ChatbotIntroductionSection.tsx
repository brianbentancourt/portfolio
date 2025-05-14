
"use client";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageSquare, AlertCircle } from "lucide-react";

export function ChatbotIntroductionSection() {
  const { t } = useLanguage();

  return (
    <Section id="chatbot-intro" title={t('chatbotIntroductionSection.title')} icon={MessageSquare}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-6">
          {t('chatbotIntroductionSection.description')}
        </p>
        <div className="bg-card p-6 rounded-lg shadow-md inline-block border border-border">
          <ul className="space-y-2 text-left text-muted-foreground list-none">
            <li className="flex items-start">
              <MessageSquare className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <span>{t('chatbotIntroductionSection.example1')}</span>
            </li>
            <li className="flex items-start">
              <MessageSquare className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
              <span>{t('chatbotIntroductionSection.example2')}</span>
            </li>
          </ul>
        </div>
        <p className="mt-8 text-foreground font-medium">
          {t('chatbotIntroductionSection.actionPrompt')}
        </p>
        <div className="mt-4 flex justify-center">
            <Button 
                onClick={() => {
                    // Attempt to trigger the chatbot widget opening logic
                    // This is a common pattern, but might need adjustment based on ChatbotWidget's specific implementation
                    const chatButton = document.querySelector('button[aria-label="Open chat"], button[aria-label="Abrir chat"]') as HTMLElement | null;
                    chatButton?.click();
                }}
                aria-label={t('chatbotWidget.openChatSrText') || "Open Chat"} // Use existing translation or a fallback
            >
                <MessageSquare className="mr-2 h-5 w-5" />
                {t('chatbotWidget.openChatSrText') || "Start Chatting"} 
            </Button>
        </div>
         <div className="mt-10 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg flex items-start space-x-3 text-blue-700 dark:text-blue-300">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm text-left">
            <strong>Note:</strong> The AI assistant provides information based on pre-programmed context about my profile. For direct contact or detailed discussions, please use the contact form or the WhatsApp button.
          </p>
        </div>
      </div>
    </Section>
  );
}
