import { Section } from "@/components/layout/Section";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <Section id="contact" title="Get In Touch" icon={Mail} className="bg-background">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m always excited to discuss new projects, creative ideas, or opportunities to collaborate. Feel free to reach out using the form, or connect with me through the details provided.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:alex.johnson.dev@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                alex.johnson.dev@example.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">San Francisco, CA</span>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
