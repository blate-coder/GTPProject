import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart as RechartsAreaChart,
  Area
} from "recharts";
import { format } from "date-fns";
import { Trophy, Award, TrendingUp, BarChart2 } from "lucide-react";

type Score = {
  id: number;
  userId: number;
  quizId: number;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
};

type ScoreAnalytics = {
  totalQuizzesTaken: number;
  averageScore: number;
  bestScore: Score | null;
  recentScores: Score[];
  scoresByCategory: Record<string, { count: number; avgScore: number }>;
};

export default function ScoreAnalytics() {
  const { user } = useAuth();
  const { data: analytics, isLoading } = useQuery<ScoreAnalytics>({
    queryKey: ["/api/scores/analytics"],
    enabled: !!user,
  });

  const { data: scores } = useQuery<Score[]>({
    queryKey: ["/api/scores"],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
      </div>
    );
  }

  if (!analytics || !scores || scores.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning Analytics</CardTitle>
          <CardDescription>
            You haven't taken any quizzes yet. Complete quizzes to see your progress.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Prepare data for charts
  const categoryData = Object.entries(analytics.scoresByCategory).map(
    ([category, data]) => ({
      name: category,
      value: data.avgScore,
    })
  );

  // Get last 10 scores for the timeline chart (newest first)
  const timelineData = [...scores]
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 10)
    .reverse()
    .map((score) => ({
      name: format(new Date(score.completedAt), "MMM d"),
      value: score.percentage,
    }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">
                {analytics.totalQuizzesTaken}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">
                  {Math.round(analytics.averageScore)}%
                </div>
              </div>
              <Progress value={analytics.averageScore} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Best Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.bestScore ? (
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <div className="text-2xl font-bold">
                    {Math.round(analytics.bestScore.percentage)}%
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Quiz #{analytics.bestScore.quizId} on{" "}
                  {format(
                    new Date(analytics.bestScore.completedAt),
                    "MMM d, yyyy"
                  )}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground">No scores yet</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="mb-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="recent">Recent Scores</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
              <CardDescription>
                How well you're doing in different types of quizzes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(analytics.scoresByCategory).length > 0 ? (
                <div className="h-[300px]">
                  <BarChart
                    data={categoryData}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${Math.round(value)}%`}
                    yAxisWidth={40}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  Not enough data to display categories
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>
                Your quiz scores over your last 10 attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {timelineData.length > 1 ? (
                <div className="h-[300px]">
                  <AreaChart
                    data={timelineData}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${Math.round(value)}%`}
                    yAxisWidth={40}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  Take more quizzes to see your progress over time
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Scores</CardTitle>
              <CardDescription>
                Your last {analytics.recentScores.length} quiz attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.recentScores.length > 0 ? (
                <div className="space-y-4">
                  {analytics.recentScores.map((score) => (
                    <div
                      key={score.id}
                      className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4"
                    >
                      <div>
                        <div className="font-medium">
                          Quiz #{score.quizId}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(
                            new Date(score.completedAt),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <div className="font-medium mr-4">
                          {score.score} / {score.maxScore}
                        </div>
                        <Badge
                          variant={
                            score.percentage >= 80
                              ? "success"
                              : score.percentage >= 60
                              ? "default"
                              : "destructive"
                          }
                        >
                          {Math.round(score.percentage)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  No recent scores available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}