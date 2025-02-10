import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { Quiz } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  
  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: [`/api/quizzes/${lessonId}`],
  });

  if (isLoading) {
    return <Skeleton className="h-[400px]" />;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      toast({
        title: "Quiz Completed!",
        description: "Great job on completing the lesson quiz.",
      });
    }
  };

  const question = quiz.questions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {quiz.questions.length}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">{question.text}</div>
        
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]}>
          {question.options.map((option, i) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${i}`} />
              <Label htmlFor={`option-${i}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        <Button 
          className="w-full" 
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
        >
          {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
}
