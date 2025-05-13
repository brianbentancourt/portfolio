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

const formSchema = z.object({
  text: z.string().min(20, {
    message: "Text must be at least 20 characters.",
  }).max(1500, {
    message: "Text must not exceed 1500 characters."
  }),
});

type OptimizerFormValues = z.infer<typeof formSchema>;

export function AiOptimizerSection() {
  const [optimizedText, setOptimizedText] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

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
          title: "Text Optimized!",
          description: "Your text has been successfully enhanced by AI.",
        });
      } else {
        throw new Error("Optimization failed to produce text.");
      }
    } catch (error) {
      console.error("Optimization error:", error);
      toast({
        title: "Optimization Failed",
        description: "An error occurred while optimizing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Section id="optimizer" title="AI Text Optimizer" icon={Wand2}>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Elevate your project descriptions or resume summaries with AI. Enter your text below and let our AI craft a more compelling and professional version.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Optimize Your Text
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
                      <FormLabel>Your Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your project description or resume summary here..."
                          className="min-h-[200px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the text you want to improve (20-1500 characters).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    "Optimize with AI"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className={`transition-opacity duration-500 ${optimizedText || isLoading ? 'opacity-100' : 'opacity-50'} shadow-lg min-h-[300px]`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Optimized Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !optimizedText && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p>AI is working its magic...</p>
              </div>
            )}
            {optimizedText && !isLoading && (
              <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/30 p-4 rounded-md whitespace-pre-line">
                {optimizedText}
              </div>
            )}
            {!optimizedText && !isLoading && (
              <p className="text-muted-foreground text-center py-10">
                Your AI-enhanced text will appear here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
