
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

// Define a function to get the schema, so it can access 't'
const getContactFormSchema = (t: (key: string, options?: { replacements?: Record<string, string | number>, fallback?: string }) => string) => z.object({
  name: z.string().min(2, {
    message: t('contactForm.validation.nameMinLength', { replacements: { count: 2 }, fallback: "Name must be at least 2 characters." }),
  }),
  email: z.string().email({
    message: t('contactForm.validation.emailInvalid', { fallback: "Please enter a valid email address." }),
  }),
  message: z.string().min(16, {
    message: t('contactForm.validation.messageMinLength', { replacements: { count: 16 }, fallback: "Message must be at least 16 characters." }),
  }).max(500, {
    message: t('contactForm.validation.messageMaxLength', { replacements: { count: 500 }, fallback: "Message must not exceed 500 characters."})
  }),
});

type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>;

export function ContactForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const formSchema = getContactFormSchema(t);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: 'onChange',
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    try {
      const subject = `New contact from ${values.name} - Portfolio`;
      const textBody = `Name: ${values.name}\nEmail: ${values.email}\nMessage: ${values.message}`;
      const htmlBody = `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #dddddd; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #007B8A; border-bottom: 2px solid #007B8A; padding-bottom: 10px; margin-top: 0;">Somebody wants to know about you</h2>
          <p style="margin-bottom: 15px;">You've received a new message from your portfolio website:</p>
          
          <div style="background-color: #ffffff; padding: 15px; border: 1px solid #eeeeee; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin-bottom: 10px; margin-top: 0;"><strong>Name:</strong> ${values.name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${values.email}" style="color: #007B8A; text-decoration: none;">${values.email}</a></p>
            <p style="margin-bottom: 5px;"><strong>Message:</strong></p>
            <div style="padding: 10px; border: 1px solid #f0f0f0; border-radius: 3px; background-color: #fdfdfd; white-space: pre-wrap; word-wrap: break-word;">${values.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
          <p style="font-size: 0.9em; color: #777777; text-align: center;">This email was sent automatically from your portfolio contact form.</p>
        </div>
      `;

      await addDoc(collection(db, "mail"), {
        to: ["brianbentancourt9@gmail.com"],
        replyTo: values.email,
        message: {
          subject: subject,
          text: textBody,
          html: htmlBody,
        },
        submittedAt: serverTimestamp(),
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
        title: t('contactForm.toastErrorTitle', { fallback: "Submission Error" }),
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
