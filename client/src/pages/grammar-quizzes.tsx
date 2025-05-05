import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useSearch } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Quiz as BaseQuiz, Lesson } from "@shared/schema";
import { z } from "zod";

// Define a more complete Quiz type with proper typing for questions and tags
const QuizSchema = z.object({
  id: z.number(),
  lessonId: z.number(),
  questions: z.array(
    z.object({
      text: z.string(),
      options: z.array(z.string()),
      answer: z.string(),
    })
  ),
  tags: z.array(z.string()),
});

type Quiz = z.infer<typeof QuizSchema>;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function GrammarQuizzes() {
  const { user } = useAuth();
  const { toast } = useToast();
  // Get the tab from URL query parameter, default to "grammar"
  const searchParams = new URLSearchParams(window.location.search);
  const tabFromUrl = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState<string>(tabFromUrl || "grammar");

  // Query to fetch quizzes by tags
  const { data: quizzes, isLoading: quizzesLoading } = useQuery<Quiz[]>({
    queryKey: ["/api/quizzes-by-tags", selectedTab],
    queryFn: async () => {
      const response = await fetch(`/api/quizzes-by-tags/${selectedTab}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      return response.json();
    },
  });

  // Query to fetch lessons to match with quizzes
  const { data: lessons, isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
    queryFn: async () => {
      const response = await fetch("/api/lessons");
      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }
      return response.json();
    },
  });

  const isLoading = quizzesLoading || lessonsLoading;

  // Get lesson title for a quiz
  const getLessonTitle = (lessonId: number): string => {
    if (!lessons) return "Loading...";
    const lesson = lessons.find(l => l.id === lessonId);
    return lesson ? lesson.title : "Unknown Lesson";
  };

  // Get lesson by ID
  const getLesson = (lessonId: number): Lesson | undefined => {
    if (!lessons) return undefined;
    return lessons.find(l => l.id === lessonId);
  };

  const [location, setLocation] = useLocation();
  
  const handleTagChange = (value: string) => {
    setSelectedTab(value);
    // Update URL with the new tab
    setLocation(`/grammar-quizzes?tab=${value}`, { replace: true });
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">
          Categories
        </h1>
      </div>

      <Tabs value={selectedTab} onValueChange={handleTagChange} className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading quizzes...</p>
        </div>
      ) : !quizzes || quizzes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No quizzes found</h3>
          <p className="text-muted-foreground">
            There are no quizzes with the {selectedTab} tag available yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const lesson = getLesson(quiz.lessonId);
            return (
              <Card key={quiz.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{getLessonTitle(quiz.lessonId)}</CardTitle>
                  </div>
                  <CardDescription>
                    {lesson?.description || "Quiz for this lesson"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">
                    {Array.isArray(quiz.questions) ? quiz.questions.length : 0} questions
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(quiz.tags) && quiz.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href={`/quiz/${quiz.lessonId}`}>
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}