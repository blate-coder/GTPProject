import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MediaPlayer from "@/components/media-player";
import JapaneseText from "@/components/japanese-text";
import type { Lesson } from "@shared/schema";
import { Link } from "wouter";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[300px]" />
      </div>
    );
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

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <MediaPlayer url={lesson.mediaUrl} type={lesson.type as "song" | "anime"} />

          <div className="flex justify-end">
            <Link href={`/quiz/${lesson.id}`}>
              <Button size="lg">Take Quiz</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <JapaneseText content={lesson.content as any} />
        </div>
      </div>
    </div>
  );
}