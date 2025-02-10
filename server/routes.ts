import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
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

  app.post("/api/progress/:userId", async (req, res) => {
    const { progress } = req.body;
    await storage.updateUserProgress(parseInt(req.params.userId), progress);
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
