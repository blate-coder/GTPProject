import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import Header from "@/components/header";
import ScoreAnalytics from "@/components/score-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBarIcon, 
  Trophy, 
  Medal, 
  BookOpen, 
  Music,
  TrendingUp
} from "lucide-react";

export default function AnalyticsPage() {
  const { user, isLoading } = useAuth();
  
  // Check if user is logged in
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <Header />
      
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Your Learning Analytics</h1>
      </div>
      
      <p className="text-muted-foreground">
        Track your progress and identify areas for improvement. Your performance
        analytics will help you focus your learning efforts.
      </p>
      
      <Tabs defaultValue="scores">
        <TabsList>
          <TabsTrigger value="scores" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Quiz Scores</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2" disabled>
            <TrendingUp className="h-4 w-4" />
            <span>Learning Path</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2" disabled>
            <Medal className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="scores" className="py-4">
          <ScoreAnalytics />
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Learning Path Coming Soon</h3>
            <p className="text-muted-foreground">
              Track your progress through structured learning paths and recommended material.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="badges">
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Medal className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Achievements Coming Soon</h3>
            <p className="text-muted-foreground">
              Earn badges and achievements as you progress in your Japanese learning journey.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}