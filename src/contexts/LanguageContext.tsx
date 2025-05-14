
"use client";
import type { ReactNode } from 'react';
import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '@/lib/i18n/locales/en.json';
import es from '@/lib/i18n/locales/es.json';

type Locale = 'en' | 'es';
// Create a type that represents the structure of your translation files.
// Assuming 'en.json' has all possible keys.
type TranslationKeys = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: { replacements?: Record<string, string | number>, fallback?: string }) => string;
}

const translations: Record<Locale, TranslationKeys> = { en, es };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en'); // Default to English

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && (storedLocale === 'en' || storedLocale === 'es')) {
      setLocaleState(storedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale;
    }
  };
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
        document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = (key: string, options?: { replacements?: Record<string, string | number>, fallback?: string }): string => {
    const { replacements, fallback } = options || {};
    const keys = key.split('.');
    let text: any = translations[locale];
    
    try {
      for (const k of keys) {
        text = text?.[k];
        if (text === undefined) throw new Error(`Translation key "${key}" not found for locale "${locale}"`);
      }
      if (typeof text !== 'string') {
         console.warn(`Translation for key "${key}" is not a string for locale "${locale}". Expected string, got ${typeof text}.`);
         return fallback ?? key; 
      }
      if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
          text = (text as string).replace(new RegExp(`{${placeholder}}`, 'g'), String(replacements[placeholder]));
        });
      }
      return text as string;
    } catch (error) {
      // console.warn((error as Error).message); // Less noisy console for missing keys if fallback is used
      // Fallback to English if key not found in current locale
      if (locale !== 'en') {
        text = translations['en'];
        try {
            for (const k of keys) {
                text = text?.[k];
                if (text === undefined) throw new Error(); // Inner throw to break loop
            }
            if (typeof text !== 'string') return fallback ?? key;
            if (replacements) {
                Object.keys(replacements).forEach(placeholder => {
                    text = (text as string).replace(new RegExp(`{${placeholder}}`, 'g'), String(replacements[placeholder]));
                });
            }
            return text as string;
        } catch {
            // If fallback also fails, return the fallback or key
            return fallback ?? key;
        }
      }
      // If current locale is 'en' and key not found, return fallback or key
      return fallback ?? key;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
