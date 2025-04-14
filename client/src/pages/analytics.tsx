import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import ScoreAnalytics from "@/components/score-analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function AnalyticsPage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Learning Analytics</h1>
        <p className="text-muted-foreground">
          Track your progress and performance across all your Japanese lessons
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Score Analytics</CardTitle>
          <CardDescription>
            Your performance across different categories and over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScoreAnalytics />
        </CardContent>
      </Card>
    </div>
  );
}