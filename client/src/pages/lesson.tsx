import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MediaPlayer from "@/components/media-player";
import type { Lesson } from "@shared/schema";
import { Link } from "wouter";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
  });

  if (isLoading) {
    return <Skeleton className="h-[500px]" />;
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </div>

      <MediaPlayer url={lesson.mediaUrl} type={lesson.type} />

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Japanese Text</h2>
            <p className="text-lg">{lesson.content.lyrics}</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Translation</h2>
            <p>{lesson.content.translation}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href={`/quiz/${lesson.id}`}>
          <Button size="lg">Take Quiz</Button>
        </Link>
      </div>
    </div>
  );
}
