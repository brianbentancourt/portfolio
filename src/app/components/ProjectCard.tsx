
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import type { ProjectType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";


interface ProjectCardProps {
  project: ProjectType;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1">
        <CardHeader className="p-0">
          <DialogTrigger asChild>
            <div className="relative aspect-video overflow-hidden cursor-pointer">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={project.imageAiHint || "project image"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-4">
                <CardTitle className="text-xl font-semibold text-primary-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
              </div>
            </div>
          </DialogTrigger>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardDescription className="text-muted-foreground line-clamp-3 mb-4">
            {project.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 border-t mt-auto">
          <div className="flex w-full justify-between items-center gap-2">
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </DialogTrigger>
            <div className="flex gap-2">
              {project.liveLink && (
                <Button asChild variant="ghost" size="icon" title="Live Demo">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {project.sourceLink && (
                <Button asChild variant="ghost" size="icon" title="Source Code">
                  <Link href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl text-primary">{project.title}</DialogTitle>
          <div className="relative aspect-video my-4 rounded-lg overflow-hidden">
            <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                data-ai-hint={project.imageAiHint || "project image"}
              />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        <ScrollArea className="flex-grow min-h-0 px-6"> {/* Added min-h-0 and adjusted padding */}
          <DialogDescription className="text-base text-muted-foreground whitespace-pre-line py-4">
            {project.longDescription || project.description}
          </DialogDescription>
        </ScrollArea>
        <div className="flex gap-2 p-6 pt-4 border-t"> {/* Adjusted padding */}
            {project.liveLink && (
              <Button asChild>
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
            {project.sourceLink && (
              <Button asChild variant="outline">
                <Link href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Source Code
                </Link>
              </Button>
            )}
          </div>
      </DialogContent>
    </Dialog>
  );
}

