import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories API
  app.get("/api/categories", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  // Courses API
  app.get("/api/courses", async (req, res) => {
    const courses = await storage.getCourses();
    const categories = await storage.getCategories();
    
    const coursesWithCategoryNames = await Promise.all(
      courses.map(async (course) => {
        const category = categories.find(c => c.id === course.categoryId);
        return {
          ...course,
          categoryName: category?.name || "Uncategorized",
          // Add progress and completed lessons as demo data
          progress: Math.floor(Math.random() * 100),
          completedLessons: Math.floor(Math.random() * course.lessons),
          lastActivity: new Date(Date.now() - Math.random() * 864000000).toLocaleDateString()
        };
      })
    );
    
    res.json(coursesWithCategoryNames);
  });

  app.get("/api/courses/featured", async (req, res) => {
    const featuredCourses = await storage.getFeaturedCourses(3);
    const categories = await storage.getCategories();
    
    const coursesWithCategoryNames = await Promise.all(
      featuredCourses.map(async (course) => {
        const category = categories.find(c => c.id === course.categoryId);
        return {
          ...course,
          categoryName: category?.name || "Uncategorized",
          // Add random progress for demo
          progress: Math.floor(Math.random() * 100)
        };
      })
    );
    
    res.json(coursesWithCategoryNames);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    
    const course = await storage.getCourseById(id);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    const category = await storage.getCategoryById(course.categoryId);
    
    // For demo, add some random progress data
    const courseWithProgress = {
      ...course,
      categoryName: category?.name || "Uncategorized",
      progress: Math.floor(Math.random() * 100),
      completedLessons: Math.floor(Math.random() * course.lessons),
      lastActivity: new Date(Date.now() - Math.random() * 864000000).toLocaleDateString()
    };
    
    res.json(courseWithProgress);
  });

  app.get("/api/courses/:id/content", async (req, res) => {
    const courseId = parseInt(req.params.id);
    
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    
    const course = await storage.getCourseById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    const sections = await storage.getContentSections(courseId);
    
    // For each section, get its content items
    const sectionsWithItems = await Promise.all(
      sections.map(async (section) => {
        const items = await storage.getContentItems(section.id);
        
        // Add random completion status for demo
        const itemsWithStatus = items.map(item => ({
          ...item,
          completed: Math.random() > 0.5
        }));
        
        return {
          ...section,
          items: itemsWithStatus
        };
      })
    );
    
    res.json(sectionsWithItems);
  });

  app.get("/api/courses/:id/quizzes", async (req, res) => {
    const courseId = parseInt(req.params.id);
    
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    
    const quizzes = await storage.getQuizzesByCourseId(courseId);
    
    // For demo, add some random completion data to some quizzes
    const quizzesWithMetadata = quizzes.map(quiz => {
      const completed = Math.random() > 0.6;
      return {
        ...quiz,
        questionCount: Math.floor(Math.random() * 5) + 3, // Random number of questions
        completed,
        ...(completed ? { score: Math.floor(Math.random() * 41) + 60 } : {}) // Score between 60-100 if completed
      };
    });
    
    res.json(quizzesWithMetadata);
  });

  // Quiz API
  app.get("/api/quizzes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }
    
    const quiz = await storage.getQuizById(id);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    const questions = await storage.getQuizQuestions(id);
    
    // Remove correct answers from questions for client
    const questionsForClient = questions.map(({ correctAnswerId, ...rest }) => rest);
    
    res.json({
      ...quiz,
      questions: questionsForClient
    });
  });

  app.post("/api/quizzes/:id/submit", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }
    
    const quiz = await storage.getQuizById(id);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    const questions = await storage.getQuizQuestions(id);
    
    // Validate request body
    const schema = z.object({
      answers: z.record(z.string())
    });
    
    try {
      const { answers } = schema.parse(req.body);
      
      // Calculate score
      let correctCount = 0;
      const correctAnswers: Record<number, string> = {};
      
      questions.forEach(question => {
        correctAnswers[question.id] = question.correctAnswerId;
        
        if (answers[question.id] === question.correctAnswerId) {
          correctCount++;
        }
      });
      
      const score = Math.round((correctCount / questions.length) * 100);
      
      // In a real app, we would save this to the database
      // For demo, we're just calculating and returning the result
      
      res.json({
        quizId: id,
        score,
        correctCount,
        totalQuestions: questions.length,
        correctAnswers
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request body" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
