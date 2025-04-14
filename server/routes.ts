import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export function registerRoutes(app: Express): Server {
  // Set up authentication routes
  setupAuth(app);

  // Existing routes
  app.get("/api/lessons", async (_req, res) => {
    const lessons = await storage.getLessons();
    res.json(lessons);
  });

  app.get("/api/lessons/:id", async (req, res) => {
    const lesson = await storage.getLesson(parseInt(req.params.id));
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
      return;
    }
    res.json(lesson);
  });

  app.get("/api/quizzes/:lessonId", async (req, res) => {
    const quiz = await storage.getQuiz(parseInt(req.params.lessonId));
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.json(quiz);
  });
  
  // Handle quiz retrieval by tags
  app.get("/api/quizzes-by-tags/:tags", async (req, res) => {
    const tags = req.params.tags.split(',');
    if (!tags || tags.length === 0) {
      return res.status(400).json({ error: "No tags provided" });
    }
    
    const filteredQuizzes = await storage.getQuizzesByTags(tags);
    res.json(filteredQuizzes);
  });

  app.post("/api/progress/:userId", async (req, res) => {
    const { progress } = req.body;
    await storage.updateUserProgress(parseInt(req.params.userId), progress);
    res.json({ success: true });
  });

  // Score recording route
  app.post("/api/scores", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const scoreData = {
        userId: req.user.id,
        quizId: req.body.quizId,
        score: req.body.score,
        maxScore: req.body.maxScore,
        percentage: (req.body.score / req.body.maxScore) * 100,
      };

      const score = await storage.recordScore(scoreData);
      res.status(201).json(score);
    } catch (error) {
      res.status(400).json({ error: "Invalid score data" });
    }
  });

  // Get all scores for a user
  app.get("/api/scores", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const scores = await storage.getUserScores(req.user.id);
    res.json(scores);
  });

  // Get scores for a specific quiz
  app.get("/api/scores/quiz/:quizId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const scores = await storage.getUserScoresByQuiz(
      req.user.id,
      parseInt(req.params.quizId)
    );
    res.json(scores);
  });

  // Get score analytics
  app.get("/api/scores/analytics", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const analytics = await storage.getScoreAnalytics(req.user.id);
    res.json(analytics);
  });

  const httpServer = createServer(app);
  return httpServer;
}