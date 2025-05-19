import { 
  users, type User, type InsertUser, type Lesson, type Quiz, 
  type Score, type InsertScore, type Customization 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
// Import lesson and quiz data from separate files
import { getAllLessons, getLessonById } from "./data/lessons";
import { getQuizByLessonId, quizzes } from "./data/quizzes";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTokens(userId: number, tokens: number): Promise<void>;
  
  // Lesson management
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  
  // Quiz management
  getQuiz(lessonId: number): Promise<Quiz | undefined>;
  getQuizzesByTags(tags: string[]): Promise<Quiz[]>;
  
  // User progress
  updateUserProgress(userId: number, progress: Record<string, any>): Promise<void>;
  
  // Score management
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
  
  // Customization management
  getCustomizations(): Promise<Customization[]>;
  getCustomization(id: number): Promise<Customization | undefined>;
  getCustomizationByName(name: string): Promise<Customization | undefined>;
  purchaseCustomization(userId: number, customizationId: number): Promise<boolean>;
  applyCustomization(userId: number, customizationType: string, customizationName: string): Promise<boolean>;
  getUserCustomizations(userId: number): Promise<string[]>;
  
  // Leaderboard
  getLeaderboard(limit?: number): Promise<Array<{userId: number, username: string, totalScore: number, quizzesTaken: number}>>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scores: Map<number, Score>;
  private customizations: Map<number, Customization>;
  private currentId: number;
  private currentScoreId: number;
  private currentCustomizationId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.scores = new Map();
    this.customizations = new Map();
    this.currentId = 1;
    this.currentScoreId = 1;
    this.currentCustomizationId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Initialize with default customizations
    this.initializeDefaultCustomizations();
  }
  
  private initializeDefaultCustomizations() {
    // Default avatars
    this.addCustomization({
      type: 'avatar',
      name: 'default-avatar',
      displayName: 'Default Avatar',
      description: 'The default user avatar',
      imageUrl: null,
      tokenCost: 0,
      requiredScore: 0,
      requiredTokensEarned: 0,
      requiredLessonsPlayed: 0
    });
    
    this.addCustomization({
      type: 'avatar',
      name: 'ninja',
      displayName: 'Ninja Avatar',
      description: 'For the stealthy learner',
      imageUrl: null,
      tokenCost: 100,
      requiredScore: 50,
      requiredTokensEarned: 50,
      requiredLessonsPlayed: 1
    });
    
    this.addCustomization({
      type: 'avatar',
      name: 'sakura',
      displayName: 'Sakura Avatar',
      description: 'Cherry blossom themed avatar',
      imageUrl: null,
      tokenCost: 150,
      requiredScore: 65,
      requiredTokensEarned: 100,
      requiredLessonsPlayed: 2
    });
    
    this.addCustomization({
      type: 'avatar',
      name: 'samurai',
      displayName: 'Samurai Avatar',
      description: 'The warrior\'s choice',
      imageUrl: null,
      tokenCost: 200,
      requiredScore: 80,
      requiredTokensEarned: 150,
      requiredLessonsPlayed: 3
    });
    
    this.addCustomization({
      type: 'avatar',
      name: 'neko',
      displayName: 'Neko Avatar',
      description: 'For cat lovers',
      imageUrl: null,
      tokenCost: 250,
      requiredScore: 90,
      requiredTokensEarned: 200,
      requiredLessonsPlayed: 4
    });
    
    // Default badges
    this.addCustomization({
      type: 'badge',
      name: 'beginner',
      displayName: 'Beginner',
      description: 'Just starting your Japanese journey',
      imageUrl: '/assets/badges/beginner.svg',
      tokenCost: 0,
      requiredScore: 0,
      requiredTokensEarned: 0,
      requiredLessonsPlayed: 0
    });
    
    this.addCustomization({
      type: 'badge',
      name: 'intermediate',
      displayName: 'Intermediate',
      description: 'Making good progress in Japanese',
      imageUrl: '/assets/badges/intermediate.svg',
      tokenCost: 150,
      requiredScore: 80,
      requiredTokensEarned: 150, 
      requiredLessonsPlayed: 2
    });
    
    this.addCustomization({
      type: 'badge',
      name: 'advanced',
      displayName: 'Advanced',
      description: 'Mastering the Japanese language',
      imageUrl: '/assets/badges/advanced.svg',
      tokenCost: 300,
      requiredScore: 90,
      requiredTokensEarned: 250,
      requiredLessonsPlayed: 5
    });
    
    // Default themes
    this.addCustomization({
      type: 'theme',
      name: 'default',
      displayName: 'Default Theme',
      description: 'The standard app theme',
      imageUrl: '/assets/themes/default.svg',
      tokenCost: 0,
      requiredScore: 0,
      requiredLessons: []
    });
    
    this.addCustomization({
      type: 'theme',
      name: 'sakura',
      displayName: 'Sakura Theme',
      description: 'Cherry blossom inspired theme',
      imageUrl: '/assets/themes/sakura.svg',
      tokenCost: 120,
      requiredScore: 70,
      requiredLessons: []
    });
    
    this.addCustomization({
      type: 'theme',
      name: 'night',
      displayName: 'Night Theme',
      description: 'Dark theme with Japanese-inspired elements',
      imageUrl: '/assets/themes/night.svg',
      tokenCost: 250,
      requiredScore: 85,
      requiredLessons: [2, 4]
    });
  }
  
  private addCustomization(customization: Omit<Customization, 'id'>): Customization {
    const id = this.currentCustomizationId++;
    const newCustomization: Customization = { ...customization, id };
    this.customizations.set(id, newCustomization);
    return newCustomization;
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
    const user: User = { 
      ...insertUser, 
      id, 
      progress: {},
      tokens: 0,
      profileImage: 'default-avatar',
      profileBadge: 'beginner',
      profileTheme: 'default',
      unlockedCustomizations: [] 
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserTokens(userId: number, amount: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      // Update tokens (add or subtract)
      const newTokenBalance = Math.max(0, (user.tokens || 0) + amount);
      this.users.set(userId, { ...user, tokens: newTokenBalance });
    }
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
  
  // Customization management methods
  async getCustomizations(): Promise<Customization[]> {
    return Array.from(this.customizations.values());
  }
  
  async getCustomization(id: number): Promise<Customization | undefined> {
    return this.customizations.get(id);
  }
  
  async getCustomizationByName(name: string): Promise<Customization | undefined> {
    return Array.from(this.customizations.values()).find(c => c.name === name);
  }
  
  async purchaseCustomization(userId: number, customizationId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    const customization = await this.getCustomization(customizationId);
    
    if (!user || !customization) {
      return false;
    }
    
    // Check if user already has this customization
    const unlockedCustomizations = Array.isArray(user.unlockedCustomizations) 
      ? user.unlockedCustomizations as string[] 
      : [];
      
    if (unlockedCustomizations.includes(customization.name)) {
      return true; // Already purchased
    }
    
    // Check if user meets the requirements
    const userScores = await this.getUserScores(userId);
    const highestScore = userScores.length > 0 
      ? Math.max(...userScores.map(s => s.percentage)) 
      : 0;
      
    const meetsScoreRequirement = highestScore >= (customization.requiredScore || 0);
    
    // Check if user has completed required lessons
    const requiredLessons = Array.isArray(customization.requiredLessons) 
      ? customization.requiredLessons as number[] 
      : [];
      
    const userProgress = user.progress || {};
    const completedLessons = Object.keys(userProgress).map(Number);
    const meetsLessonRequirement = requiredLessons.every(lessonId => 
      completedLessons.includes(lessonId)
    );
    
    // Check if user has enough tokens
    const canAfford = (user.tokens || 0) >= (customization.tokenCost || 0);
    
    if (meetsScoreRequirement && meetsLessonRequirement && canAfford) {
      // Deduct tokens
      const tokenCost = customization.tokenCost || 0;
      const newBalance = Math.max(0, (user.tokens || 0) - tokenCost);
      
      // Add to user's unlocked customizations
      const newUnlockedCustomizations = [...unlockedCustomizations, customization.name];
      
      // Update user with both new token balance and unlocked customizations
      this.users.set(userId, {
        ...user, 
        tokens: newBalance,
        unlockedCustomizations: newUnlockedCustomizations
      });
      
      return true;
    }
    
    return false;
  }
  
  async applyCustomization(userId: number, customizationType: string, customizationName: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) {
      return false;
    }
    
    // Check if user has this customization
    const unlockedCustomizations = Array.isArray(user.unlockedCustomizations) 
      ? user.unlockedCustomizations as string[] 
      : [];
      
    // For default customizations, don't check if unlocked
    const isDefault = customizationName.startsWith('default') || 
                      customizationName === 'beginner' ||
                      customizationName === 'default';
                      
    if (!isDefault && !unlockedCustomizations.includes(customizationName)) {
      return false;
    }
    
    // Apply the customization based on type
    switch (customizationType) {
      case 'avatar':
        this.users.set(userId, { ...user, profileImage: customizationName });
        break;
      case 'badge':
        this.users.set(userId, { ...user, profileBadge: customizationName });
        break;
      case 'theme':
        this.users.set(userId, { ...user, profileTheme: customizationName });
        break;
      default:
        return false;
    }
    
    return true;
  }
  
  async getUserCustomizations(userId: number): Promise<string[]> {
    const user = await this.getUser(userId);
    if (!user) {
      return [];
    }
    
    return Array.isArray(user.unlockedCustomizations) 
      ? user.unlockedCustomizations as string[] 
      : [];
  }
  
  // Leaderboard functionality
  async getLeaderboard(limit: number = 10): Promise<Array<{
    userId: number;
    username: string;
    totalScore: number;
    quizzesTaken: number;
  }>> {
    const users = Array.from(this.users.values());
    const result = [];
    
    for (const user of users) {
      const userScores = await this.getUserScores(user.id);
      if (userScores.length === 0) {
        continue; // Skip users with no scores
      }
      
      const totalScore = userScores.reduce((sum, score) => sum + score.score, 0);
      
      result.push({
        userId: user.id,
        username: user.username,
        totalScore,
        quizzesTaken: userScores.length
      });
    }
    
    // Sort by total score in descending order
    const sorted = result.sort((a, b) => b.totalScore - a.totalScore);
    
    // Return only the specified number of entries
    return sorted.slice(0, limit);
  }
}

export const storage = new MemStorage();