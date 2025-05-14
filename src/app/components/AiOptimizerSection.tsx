
"use client";

import * as React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Section } from "@/components/layout/Section";
import { Wand2, Sparkles, Loader2 } from "lucide-react";
import { optimizeProjectDescription, OptimizeProjectDescriptionInput } from "@/ai/flows/optimize-project-description";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  text: z.string().min(20, {
    message: "Text must be at least 20 characters.", // This validation message could also be translated if needed
  }).max(1500, {
    message: "Text must not exceed 1500 characters." // This validation message could also be translated
  }),
});

type OptimizerFormValues = z.infer<typeof formSchema>;

export function AiOptimizerSection() {
  const [optimizedText, setOptimizedText] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<OptimizerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: OptimizerFormValues) {
    setIsLoading(true);
    setOptimizedText(null);
    try {
      const input: OptimizeProjectDescriptionInput = { text: values.text };
      const result = await optimizeProjectDescription(input);
      if (result.optimizedText) {
        setOptimizedText(result.optimizedText);
        toast({
          title: t('aiOptimizerSection.toast.successTitle'),
          description: t('aiOptimizerSection.toast.successDescription'),
        });
      } else {
        throw new Error("Optimization failed to produce text.");
      }
    } catch (error) {
      console.error("Optimization error:", error);
      toast({
        title: t('aiOptimizerSection.toast.errorTitle'),
        description: t('aiOptimizerSection.toast.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Section id="optimizer" title={t('aiOptimizerSection.title')} icon={Wand2}>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        {t('aiOptimizerSection.description')}
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t('aiOptimizerSection.form.yourText')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('aiOptimizerSection.form.yourText')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('aiOptimizerSection.form.placeholder')}
                          className="min-h-[200px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t('aiOptimizerSection.form.description')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('aiOptimizerSection.form.optimizingButton')}
                    </>
                  ) : (
                    t('aiOptimizerSection.form.submitButton')
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className={`transition-opacity duration-500 ${optimizedText || isLoading ? 'opacity-100' : 'opacity-50'} min-h-[300px]`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t('aiOptimizerSection.resultCard.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !optimizedText && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p>{t('aiOptimizerSection.resultCard.loading')}</p>
              </div>
            )}
            {optimizedText && !isLoading && (
              <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-line">
                {optimizedText}
              </div>
            )}
            {!optimizedText && !isLoading && (
              <p className="text-muted-foreground text-center py-10">
                {t('aiOptimizerSection.resultCard.placeholder')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

