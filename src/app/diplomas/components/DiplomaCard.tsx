
"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DiplomaType } from "@/lib/types";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


interface DiplomaCardProps {
  diploma: DiplomaType;
}

export function DiplomaCard({ diploma }: DiplomaCardProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const [isModalImageLoading, setIsModalImageLoading] = React.useState(true);


  // Reset loading state when dialog opens or diploma.imageUrl changes
  React.useEffect(() => {
    setIsModalImageLoading(true);
  }, [diploma.imageUrl]);


  return (
    <Dialog onOpenChange={(open) => { if (open) setIsModalImageLoading(true); }}>
      <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
        <DialogTrigger asChild>
          <div className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-muted">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/70">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}
            <Image
              src={diploma.imageUrl}
              alt={diploma.title}
              fill
              className={`object-contain transition-opacity duration-300 group-hover:scale-105 p-2 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint={diploma.imageAiHint || "certificate document"}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              unoptimized
            />
          </div>
        </DialogTrigger>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
            {diploma.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm text-muted-foreground">
            {diploma.issuer} - {diploma.date}
          </CardDescription>
        </CardContent>
         <div className="p-4 pt-0 mt-auto">
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                View Full Size
              </Button>
            </DialogTrigger>
          </div>
      </Card>

       <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2 shrink-0">
          <DialogTitle className="text-2xl text-primary">{diploma.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Issued by: {diploma.issuer} | Date: {diploma.date}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow min-h-0 px-6 py-2">
          <div className="relative aspect-[calc(8.5/11)] w-full mx-auto max-w-full max-h-[calc(80vh-100px)] bg-muted rounded-md overflow-hidden">
            {isModalImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/70">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            )}
            <Image
              src={diploma.imageUrl}
              alt={`Full view of ${diploma.title}`}
              fill
              className={`object-contain p-1 transition-opacity duration-300 ${isModalImageLoading ? 'opacity-0' : 'opacity-100'}`}
              data-ai-hint={diploma.imageAiHint || "certificate document"}
              onLoad={() => setIsModalImageLoading(false)}
              onError={() => setIsModalImageLoading(false)}
              unoptimized
            />
          </div>
        </ScrollArea>
         <div className="p-6 pt-4 border-t shrink-0 text-right">
          <DialogTrigger asChild>
            <Button variant="outline">Close</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

