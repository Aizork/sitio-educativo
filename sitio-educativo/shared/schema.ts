import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  description: true,
});

// Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull(),
  level: text("level").notNull(),
  duration: text("duration").notNull(),
  lessons: integer("lessons").notNull(),
  imageUrl: text("image_url"),
  learningPoints: json("learning_points").$type<string[]>(),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  categoryId: true,
  level: true,
  duration: true,
  lessons: true,
  imageUrl: true,
  learningPoints: true,
});

// Content sections
export const contentSections = pgTable("content_sections", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
});

export const insertContentSectionSchema = createInsertSchema(contentSections).pick({
  courseId: true,
  title: true,
  type: true,
  description: true,
  order: true,
});

// Content items
export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  duration: text("duration").notNull(),
  content: text("content"),
  order: integer("order").notNull(),
});

export const insertContentItemSchema = createInsertSchema(contentItems).pick({
  sectionId: true,
  title: true,
  type: true,
  duration: true,
  content: true,
  order: true,
});

// Quizzes
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  timeLimit: text("time_limit").notNull(),
  difficulty: text("difficulty").notNull(),
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  courseId: true,
  title: true,
  description: true,
  timeLimit: true,
  difficulty: true,
});

// Quiz questions
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull(),
  text: text("text").notNull(),
  options: json("options").$type<{id: string, text: string}[]>(),
  correctAnswerId: text("correct_answer_id").notNull(),
  explanation: text("explanation"),
  order: integer("order").notNull(),
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).pick({
  quizId: true,
  text: true,
  options: true,
  correctAnswerId: true,
  explanation: true,
  order: true,
});

// User progress and scores
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").notNull().default(0),
  completedItems: json("completed_items").$type<number[]>().default([]),
  lastActivity: text("last_activity"),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  courseId: true,
  progress: true,
  completedItems: true,
  lastActivity: true,
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  quizId: integer("quiz_id").notNull(),
  score: integer("score").notNull(),
  answers: json("answers").$type<Record<number, string>>(),
  completedAt: text("completed_at").notNull(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  userId: true,
  quizId: true,
  score: true,
  answers: true,
  completedAt: true,
});

// Type exports
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type ContentSection = typeof contentSections.$inferSelect;
export type InsertContentSection = z.infer<typeof insertContentSectionSchema>;

export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;

// Keep the users table to maintain compatibility with existing code
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
