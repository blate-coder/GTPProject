import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Lesson from "@/pages/lesson";
import Quiz from "@/pages/quiz";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import GrammarQuizzes from "@/pages/grammar-quizzes";
import Analytics from "@/pages/analytics";
import ProfilePage from "@/pages/profile";
import Header from "@/components/header";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/hooks/use-theme";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/lesson/:id" component={Lesson} />
          <Route path="/quiz/:lessonId" component={Quiz} />
          <Route path="/grammar-quizzes" component={GrammarQuizzes} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Router />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;