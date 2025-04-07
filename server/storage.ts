import { users, type User, type InsertUser, type Lesson, type Quiz } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
// Import lesson and quiz data from separate files
import { getAllLessons, getLessonById } from "./data/lessons";
import { getQuizByLessonId } from "./data/quizzes";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getQuiz(lessonId: number): Promise<Quiz | undefined>;
  updateUserProgress(userId: number, progress: Record<string, any>): Promise<void>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private currentId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
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

  async updateUserProgress(userId: number, progress: Record<string, any>): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      this.users.set(userId, { ...user, progress });
    }
  }
}

export const storage = new MemStorage();