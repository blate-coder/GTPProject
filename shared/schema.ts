import { pgTable, text, serial, integer, boolean, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  progress: jsonb("progress").default({}).notNull(),
  tokens: integer("tokens").default(0).notNull(),
  profileImage: text("profile_image").default("default-avatar"),
  profileBadge: text("profile_badge").default("beginner"),
  profileTheme: text("profile_theme").default("default"),
  unlockedCustomizations: jsonb("unlocked_customizations").default([]).notNull(),
  completedLessons: jsonb("completed_lessons").default([]).notNull(),
  highestScore: integer("highest_score").default(0).notNull(),
});

export const scores = pgTable("scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  percentage: real("percentage").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'song' or 'anime'
  mediaUrl: text("media_url").notNull(),
  content: jsonb("content").notNull(), // Japanese text, translations, etc
  difficulty: text("difficulty").notNull(), // 'beginner', 'intermediate', 'advanced'
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  questions: jsonb("questions").notNull(),
  // Added tags field to categorize quizzes (vocabulary, grammar, etc.)
  tags: jsonb("tags").default([]).notNull(),
});

export const customizations = pgTable("customizations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'avatar', 'badge', 'theme'
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(), 
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  tokenCost: integer("token_cost").notNull(),
  requiredScore: integer("required_score").default(0), // minimum score needed to unlock
  requiredTokensEarned: integer("required_tokens_earned").default(0), // minimum total tokens earned
  requiredLessonsPlayed: integer("required_lessons_played").default(0), // minimum number of lessons completed
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLessonSchema = createInsertSchema(lessons);
export const insertQuizSchema = createInsertSchema(quizzes);
export const insertCustomizationSchema = createInsertSchema(customizations);

export const insertScoreSchema = createInsertSchema(scores).omit({ 
  id: true, 
  completedAt: true 
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertScore = z.infer<typeof insertScoreSchema>;
export type InsertCustomization = z.infer<typeof insertCustomizationSchema>;
export type User = typeof users.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Score = typeof scores.$inferSelect;
export type Customization = typeof customizations.$inferSelect;
