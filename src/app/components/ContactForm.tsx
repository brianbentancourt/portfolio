
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Validation messages could also be translated if needed, by passing t() to min/email/max
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not exceed 500 characters."
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    try {
      // The "Trigger Email" extension typically looks for a "to" field in the document,
      // or you configure a default "to" address in the extension settings.
      // We'll assume you configure brianbentancourt9@gmail.com in the extension.
      // You can add more fields like 'subject' if needed for the extension's template.
      await addDoc(collection(db, "contact_submissions"), {
        name: values.name,
        email: values.email, // This can be used as the replyTo field in the email extension
        message: values.message,
        submittedAt: serverTimestamp(),
        to: "brianbentancourt9@gmail.com", // Explicitly setting the recipient
        // For the email template in the extension, you might use:
        // subject: `New contact from ${values.name}`,
        // html: `<p>Name: ${values.name}</p><p>Email: ${values.email}</p><p>Message: ${values.message}</p>`,
      });

      toast({
        title: t('contactForm.toastSuccessTitle'),
        description: t('contactForm.toastSuccessDescription'),
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form to Firestore:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: t('contactForm.toastErrorDescription', { fallback: "Failed to send message. Please ensure Firebase is configured correctly and try again."}),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contactForm.nameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contactForm.namePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contactForm.emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('contactForm.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contactForm.messageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('contactForm.messagePlaceholder')}
                  className="min-h-[150px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('contactForm.messageDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('contactForm.sendingButton')}
            </>
          ) : (
             t('contactForm.submitButton')
          )}
        </Button>
      </form>
    </Form>
  );
}
