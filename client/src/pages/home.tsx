import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BookOpen, BookText, GraduationCap } from "lucide-react";
import LessonCard from "@/components/lesson-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Learn Japanese Through Entertainment</h1>
        <p className="text-lg text-muted-foreground">Master Japanese with your favorite songs and anime!</p>
      </div>

      {/* Specialized Practice Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Specialized Practice</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <GraduationCap className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Grammar Practice</CardTitle>
              <CardDescription>
                Focus on Japanese grammar patterns, sentence structures, and language rules.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Perfect for mastering particles, verb conjugations, and grammar patterns
                essential for JLPT preparation.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/grammar-quizzes">
                <Button className="w-full">Start Grammar Practice</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="h-full flex flex-col">
            <CardHeader>
              <BookText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Vocabulary Practice</CardTitle>
              <CardDescription>
                Build your Japanese vocabulary through targeted word exercises.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Expand your Japanese lexicon with vocabulary from songs, anime, and 
                everyday conversation.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/grammar-quizzes?tab=vocabulary">
                <Button variant="outline" className="w-full">Vocabulary Quizzes</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="h-full flex flex-col">
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Reading Practice</CardTitle>
              <CardDescription>
                Improve your reading comprehension with Japanese text exercises.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Practice reading hiragana, katakana, and kanji with real-world examples
                from Japanese media.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/grammar-quizzes?tab=reading">
                <Button variant="outline" className="w-full">Reading Quizzes</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Lesson Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lessons</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons?.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}
