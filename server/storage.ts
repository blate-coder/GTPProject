import { users, type User, type InsertUser, type Lesson, type Quiz, type Score, type InsertScore } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
// Import lesson and quiz data from separate files
import { getAllLessons, getLessonById } from "./data/lessons";
import { getQuizByLessonId, quizzes } from "./data/quizzes";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getQuiz(lessonId: number): Promise<Quiz | undefined>;
  getQuizzesByTags(tags: string[]): Promise<Quiz[]>;
  updateUserProgress(userId: number, progress: Record<string, any>): Promise<void>;
  recordScore(score: InsertScore): Promise<Score>;
  getUserScores(userId: number): Promise<Score[]>;
  getUserScoresByQuiz(userId: number, quizId: number): Promise<Score[]>;
  getScoreAnalytics(userId: number): Promise<{
    totalQuizzesTaken: number;
    averageScore: number;
    bestScore: Score | null;
    recentScores: Score[];
    scoresByCategory: Record<string, {count: number, avgScore: number}>;
  }>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scores: Map<number, Score>;
  private currentId: number;
  private currentScoreId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.scores = new Map();
    this.currentId = 1;
    this.currentScoreId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, progress: {} };
    this.users.set(id, user);
    return user;
  }

  async getLessons(): Promise<Lesson[]> {
    // Get lessons from the separate lessons module
    return getAllLessons();
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    // Get a specific lesson by id from the lessons module
    return getLessonById(id);
  }

  async getQuiz(lessonId: number): Promise<Quiz | undefined> {
    // Get a quiz for a specific lesson from the quizzes module
    return getQuizByLessonId(lessonId);
  }

  async getQuizzesByTags(tags: string[]): Promise<Quiz[]> {
    // Filter quizzes that have at least one of the specified tags
    if (tags.length === 0) {
      return quizzes; // Return all quizzes if no tags specified
    }

    return quizzes.filter(quiz => {
      // Access the tags property safely using type assertion
      const quizTags = Array.isArray(quiz.tags) ? quiz.tags as string[] : [];
      return quizTags.length > 0 && tags.some(tag => quizTags.includes(tag));
    });
  }

  async updateUserProgress(userId: number, progress: Record<string, any>): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      this.users.set(userId, { ...user, progress });
    }
  }

  async recordScore(score: InsertScore): Promise<Score> {
    const id = this.currentScoreId++;
    const now = new Date();
    const newScore: Score = {
      ...score,
      id,
      completedAt: now
    };
    this.scores.set(id, newScore);
    return newScore;
  }

  async getUserScores(userId: number): Promise<Score[]> {
    const allScores = Array.from(this.scores.values());
    // Only return scores that actually belong to this user
    const userScores = allScores.filter(score => score.userId === userId);
    
    return userScores.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  async getUserScoresByQuiz(userId: number, quizId: number): Promise<Score[]> {
    const userScores = await this.getUserScores(userId);
    return userScores.filter(score => score.quizId === quizId)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  async getScoreAnalytics(userId: number): Promise<{
    totalQuizzesTaken: number;
    averageScore: number;
    bestScore: Score | null;
    recentScores: Score[];
    scoresByCategory: Record<string, {count: number, avgScore: number}>;
  }> {
    const userScores = await this.getUserScores(userId);

    if (userScores.length === 0) {
      return {
        totalQuizzesTaken: 0,
        averageScore: 0,
        bestScore: null,
        recentScores: [],
        scoresByCategory: {}
      };
    }

    // Calculate analytics
    const totalQuizzesTaken = userScores.length;
    const averageScore = userScores.reduce((sum, score) => sum + score.percentage, 0) / totalQuizzesTaken;

    // Find best score
    const bestScore = userScores.reduce((best, current) => 
      !best || current.percentage > best.percentage ? current : best, null as Score | null);

    // Get recent scores (last 5)
    const recentScores = userScores.slice(0, 5);

    // Calculate scores by category (tags)
    const scoresByCategory: Record<string, {count: number, avgScore: number}> = {};

    // We need to look up quiz data to get tags
    for (const score of userScores) {
      const quiz = await this.getQuiz(score.quizId);
      if (quiz && Array.isArray(quiz.tags)) {
        for (const tag of quiz.tags as string[]) {
          if (!scoresByCategory[tag]) {
            scoresByCategory[tag] = { count: 0, avgScore: 0 };
          }

          // Update running average
          const current = scoresByCategory[tag];
          current.avgScore = (current.avgScore * current.count + score.percentage) / (current.count + 1);
          current.count++;
          scoresByCategory[tag] = current;
        }
      }
    }

    return {
      totalQuizzesTaken,
      averageScore,
      bestScore,
      recentScores,
      scoresByCategory
    };
  }
}

export const storage = new MemStorage();