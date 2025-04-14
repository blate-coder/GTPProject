import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useMemo } from "react";
import type { Quiz } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Progress } from "@/components/ui/progress";
import { Check, X, Trophy, RotateCcw } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  // Store shuffled options for each question
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, string[]>>({});
  
  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: [`/api/quizzes/${lessonId}`],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: Record<string, any>) => {
      if (!user) return;
      const res = await apiRequest("POST", `/api/progress/${user.id}`, { progress: progressData });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Progress Updated",
        description: "Your quiz results have been saved.",
      });
    }
  });
  
  const recordScoreMutation = useMutation({
    mutationFn: async (scoreData: { quizId: number; score: number; maxScore: number; }) => {
      const res = await apiRequest("POST", "/api/scores", scoreData);
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh analytics
      queryClient.invalidateQueries({ queryKey: ["/api/scores"] });
      queryClient.invalidateQueries({ queryKey: ["/api/scores/analytics"] });
    }
  });

  // Initialize or reset when quiz data is loaded or lessonId changes
  useEffect(() => {
    if (quiz) {
      // Create shuffled options for each question
      const shuffledOptions: Record<number, string[]> = {};
      quiz.questions.forEach((question, index) => {
        shuffledOptions[index] = shuffleArray(question.options);
      });
      
      setShuffledOptionsMap(shuffledOptions);
      setCurrentQuestion(0);
      setAnswers([]);
      setQuizFinished(false);
      setScore({ correct: 0, total: 0 });
      setShowAnswer(false);
    }
  }, [quiz, lessonId]);

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
    // Show the correct answer before moving to the next question
    if (!showAnswer) {
      setShowAnswer(true);
      // Calculate if current answer is correct
      const isCorrect = answers[currentQuestion] === quiz.questions[currentQuestion].answer;
      if (isCorrect) {
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      }
      return;
    }

    // Reset show answer state
    setShowAnswer(false);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      // Quiz is finished - no need to update the score here as it's already updated
      // when showing the answer in the first part of handleNext
      const finalScore = {
        correct: score.correct,
        total: quiz.questions.length
      };
      
      setScore(finalScore);
      setQuizFinished(true);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${finalScore.correct} out of ${finalScore.total}`,
      });

      // Update user progress if logged in
      if (user) {
        const progressData = {
          ...user.progress,
          quizzes: {
            ...user.progress.quizzes,
            [lessonId]: {
              completed: true,
              score: finalScore.correct,
              total: finalScore.total,
              lastAttempt: new Date().toISOString()
            }
          }
        };
        
        updateProgressMutation.mutate(progressData);
        
        // Record the score for analytics
        recordScoreMutation.mutate({
          quizId: parseInt(lessonId),
          score: finalScore.correct,
          maxScore: finalScore.total
        });
      }
    }
  };

  const handleRetake = () => {
    // Reshuffle options for a new attempt
    if (quiz) {
      const newShuffledOptions: Record<number, string[]> = {};
      quiz.questions.forEach((question, index) => {
        newShuffledOptions[index] = shuffleArray(question.options);
      });
      setShuffledOptionsMap(newShuffledOptions);
    }
    
    setQuizFinished(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setScore({ correct: 0, total: 0 });
    setShowAnswer(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score.correct / score.total) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>Lesson: {quiz.lessonId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Trophy className="h-20 w-20 text-yellow-500" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Your Score</h3>
            <p className="text-3xl font-bold">{score.correct} / {score.total}</p>
            <Progress value={percentage} className="h-3 w-full mt-2" />
            <p className="text-muted-foreground mt-2">
              {percentage >= 80 ? "Excellent! You've mastered this lesson." : 
               percentage >= 60 ? "Good job! Keep practicing for mastery." : 
               "You might need more practice on this lesson."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handleRetake}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Retake Quiz
          </Button>
          
          <Link href={`/lesson/${lessonId}`}>
            <Button>Back to Lesson</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const question = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const isCorrect = showAnswer && selectedAnswer === question.answer;
  const isIncorrect = showAnswer && selectedAnswer !== question.answer;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestion + 1} of {quiz.questions.length}</CardTitle>
          <Progress value={(currentQuestion / quiz.questions.length) * 100} className="h-2 w-1/3" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">{question.text}</div>
        
        <RadioGroup 
          onValueChange={handleAnswer} 
          value={selectedAnswer}
          className="space-y-3"
          disabled={showAnswer}
        >
          {/* Use the shuffled options from our map instead of the original options */}
          {(shuffledOptionsMap[currentQuestion] || question.options).map((option, i) => {
            const isOptionCorrect = option === question.answer;
            const isSelectedIncorrect = isIncorrect && option === selectedAnswer;
            
            return (
              <div 
                key={i} 
                className={`flex items-center space-x-2 p-3 rounded-md border ${
                  showAnswer && isOptionCorrect ? "border-green-500 bg-green-50 dark:bg-green-950" : 
                  isSelectedIncorrect ? "border-red-500 bg-red-50 dark:bg-red-950" : 
                  "border-gray-200 dark:border-gray-800"
                }`}
              >
                <RadioGroupItem value={option} id={`option-${i}`} />
                <Label htmlFor={`option-${i}`} className="flex-1">{option}</Label>
                {showAnswer && isOptionCorrect && <Check className="h-5 w-5 text-green-500" />}
                {isSelectedIncorrect && option === selectedAnswer && <X className="h-5 w-5 text-red-500" />}
              </div>
            );
          })}
        </RadioGroup>

        {showAnswer && (
          <div className={`p-4 rounded-md ${isCorrect ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"}`}>
            <p className="font-medium mb-1">
              {isCorrect ? "Correct! 🎉" : "Not quite right"}
            </p>
            <p>
              {isCorrect 
                ? "Great job! You selected the correct answer." 
                : `The correct answer is: ${question.answer}`}
            </p>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {showAnswer 
            ? (currentQuestion < quiz.questions.length - 1 ? "Next Question" : "View Results") 
            : "Check Answer"}
        </Button>
      </CardContent>
    </Card>
  );
}
