import { users, type User, type InsertUser, type Lesson, type Quiz } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

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
  private lessons: Map<number, Lesson>;
  private quizzes: Map<number, Quiz>;
  private currentId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.quizzes = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockLessons: Lesson[] = [
      {
        id: 1,
        title: "Gurenge - Demon Slayer OP",
        description: "Learn Japanese with the opening theme of Demon Slayer",
        type: "song",
        mediaUrl: "https://example.com/gurenge.mp4",
        content: {
          lyrics: "赫く尊き 永久の盾よ\n命を燃やして 護りし者よ\n鬼を祓いて 済ませぬまま\n今日も陽は落ちて 朱く染まる",
          translation: "Oh crimson shield, noble and eternal\nThose who burned their lives to protect\nUnable to completely exorcise the demons\nToday again the sun sets, dyed in crimson",
          vocabulary: [
            {
              word: "赫く",
              reading: "あかく",
              meaning: "Crimson, bright red",
              example: "空が赫く染まる - The sky is dyed crimson"
            },
            {
              word: "尊き",
              reading: "とうとき",
              meaning: "Noble, precious, sacred",
              example: "尊き命 - Precious life"
            },
            {
              word: "護りし",
              reading: "まもりし",
              meaning: "To protect (classical form)",
              example: "国を護りし勇者 - The hero who protected the country"
            }
          ]
        },
        difficulty: "beginner"
      },
    ];

    mockLessons.forEach(lesson => this.lessons.set(lesson.id, lesson));
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
    return Array.from(this.lessons.values());
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getQuiz(lessonId: number): Promise<Quiz | undefined> {
    return this.quizzes.get(lessonId);
  }

  async updateUserProgress(userId: number, progress: Record<string, any>): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      this.users.set(userId, { ...user, progress });
    }
  }
}

export const storage = new MemStorage();