import { useQuery } from "@tanstack/react-query";
import LessonCard from "@/components/lesson-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Lesson } from "@shared/schema";

export default function Home() {
  const { data: lessons, isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-[250px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Learn Japanese Through Entertainment</h1>
        <p className="text-lg text-muted-foreground">Master Japanese with your favorite songs and anime!</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons?.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
