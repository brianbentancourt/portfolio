import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function Section({
  id,
  title,
  icon: Icon,
  children,
  className,
  titleClassName,
  contentClassName,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 md:py-24", className)}
      aria-labelledby={title && id ? `${id}-title` : undefined}
      {...props}
    >
      <div className={cn("container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", contentClassName)}>
        {title && (
          <div className="mb-10 md:mb-12 text-center">
            <h2
              id={title && id ? `${id}-title` : undefined}
              className={cn(
                "text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3",
                titleClassName
              )}
            >
              {Icon && <Icon className="h-8 w-8 sm:h-9 sm:w-9 text-primary" />}
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
