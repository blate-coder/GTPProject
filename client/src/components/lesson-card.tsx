import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Video } from "lucide-react";
import { Link } from "wouter";
import type { Lesson } from "@shared/schema";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          {lesson.type === 'song' ? <Music className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          <Badge variant="outline">{lesson.difficulty}</Badge>
        </div>
        <CardTitle className="mt-2">{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/lesson/${lesson.id}`}>
          <Button className="w-full">Start Lesson</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
