import {
  type Category, type InsertCategory,
  type Course, type InsertCourse,
  type ContentSection, type InsertContentSection,
  type ContentItem, type InsertContentItem,
  type Quiz, type InsertQuiz,
  type QuizQuestion, type InsertQuizQuestion,
  type UserProgress, type InsertUserProgress,
  type QuizResult, type InsertQuizResult,
  type User, type InsertUser
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  getFeaturedCourses(limit?: number): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Content methods
  getContentSections(courseId: number): Promise<ContentSection[]>;
  getContentItems(sectionId: number): Promise<ContentItem[]>;
  createContentSection(section: InsertContentSection): Promise<ContentSection>;
  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  
  // Quiz methods
  getQuizzesByCourseId(courseId: number): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | undefined>;
  getQuizQuestions(quizId: number): Promise<QuizQuestion[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // Progress methods
  getUserProgress(userId: number, courseId: number): Promise<UserProgress | undefined>;
  createOrUpdateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Quiz results methods
  getQuizResult(userId: number, quizId: number): Promise<QuizResult | undefined>;
  saveQuizResult(result: InsertQuizResult): Promise<QuizResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private courses: Map<number, Course>;
  private contentSections: Map<number, ContentSection>;
  private contentItems: Map<number, ContentItem>;
  private quizzes: Map<number, Quiz>;
  private quizQuestions: Map<number, QuizQuestion>;
  private userProgress: Map<string, UserProgress>;
  private quizResults: Map<string, QuizResult>;
  
  private nextIds: {
    users: number;
    categories: number;
    courses: number;
    contentSections: number;
    contentItems: number;
    quizzes: number;
    quizQuestions: number;
    userProgress: number;
    quizResults: number;
  };

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.courses = new Map();
    this.contentSections = new Map();
    this.contentItems = new Map();
    this.quizzes = new Map();
    this.quizQuestions = new Map();
    this.userProgress = new Map();
    this.quizResults = new Map();
    
    this.nextIds = {
      users: 1,
      categories: 1,
      courses: 1,
      contentSections: 1,
      contentItems: 1,
      quizzes: 1,
      quizQuestions: 1,
      userProgress: 1,
      quizResults: 1,
    };
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add categories
    const categories = [
      { name: "Matemáticas", description: "Explora conceptos matemáticos y resolución de problemas" },
      { name: "Ciencias", description: "Estudia fenómenos naturales y principios científicos" },
      { name: "Lenguaje y Literatura", description: "Desarrolla habilidades de lectura, escritura y comunicación" },
      { name: "Informática", description: "Aprende programación, algoritmos y principios de computación" },
      { name: "Historia", description: "Descubre eventos históricos y su importancia" }
    ];
    
    categories.forEach(cat => this.createCategory(cat));
    
    // Add courses
    const courses = [
      {
        title: "Fundamentos de Álgebra",
        description: "Domina conceptos algebraicos incluyendo ecuaciones, desigualdades y funciones. Este curso proporciona una base sólida para matemáticas de nivel superior.",
        categoryId: 1,
        level: "Principiante",
        duration: "6 semanas",
        lessons: 12,
        imageUrl: "",
        learningPoints: [
          "Resolver ecuaciones lineales y desigualdades",
          "Graficar funciones lineales y cuadráticas",
          "Comprender notación y operaciones de funciones",
          "Aplicar conceptos algebraicos a la resolución de problemas"
        ]
      },
      {
        title: "Introducción a la Biología",
        description: "Explora los fundamentos de la biología, desde células hasta ecosistemas. Aprende sobre organismos vivos, sus estructuras, funciones e interacciones.",
        categoryId: 2,
        level: "Principiante",
        duration: "8 semanas",
        lessons: 16,
        imageUrl: "",
        learningPoints: [
          "Entender la estructura y función celular",
          "Explicar genética básica y herencia",
          "Describir dinámicas de ecosistemas",
          "Identificar sistemas biológicos principales en organismos"
        ]
      },
      {
        title: "Taller de Escritura Creativa",
        description: "Desarrolla tus habilidades de escritura creativa a través de ejercicios guiados y retroalimentación. Aprende técnicas para ficción, poesía y narrativa no ficticia.",
        categoryId: 3,
        level: "Intermedio",
        duration: "10 semanas",
        lessons: 20,
        imageUrl: "",
        learningPoints: [
          "Crear personajes y escenarios convincentes",
          "Estructurar narrativas efectivas",
          "Desarrollar una voz de escritura única",
          "Dar y recibir retroalimentación constructiva"
        ]
      },
      {
        title: "Programación con JavaScript",
        description: "Aprende programación con JavaScript desde cero. Construye aplicaciones web interactivas y comprende conceptos fundamentales de programación.",
        categoryId: 4,
        level: "Principiante",
        duration: "12 semanas",
        lessons: 24,
        imageUrl: "",
        learningPoints: [
          "Comprender sintaxis y estructura de JavaScript",
          "Trabajar con variables, arrays y objetos",
          "Implementar funciones y manejadores de eventos",
          "Crear contenido web dinámico"
        ]
      },
      {
        title: "Historia Mundial: Civilizaciones Antiguas",
        description: "Explora civilizaciones antiguas y sus contribuciones a la historia humana. Desde Mesopotamia hasta América, descubre los fundamentos de la sociedad moderna.",
        categoryId: 5,
        level: "Intermedio",
        duration: "8 semanas",
        lessons: 16,
        imageUrl: "",
        learningPoints: [
          "Analizar el auge y caída de grandes civilizaciones",
          "Comparar desarrollos culturales entre regiones",
          "Conectar innovaciones antiguas con la sociedad moderna",
          "Evaluar evidencia histórica y perspectivas"
        ]
      }
    ];
    
    const courseIds = courses.map(course => this.createCourse(course).id);
    
    // Add content sections for Algebra course
    const algebraSections = [
      {
        courseId: courseIds[0],
        title: "Linear Equations",
        type: "module",
        description: "Learn to solve and apply linear equations",
        order: 1
      },
      {
        courseId: courseIds[0],
        title: "Quadratic Functions",
        type: "module",
        description: "Understand quadratic functions and their graphs",
        order: 2
      }
    ];
    
    const sectionIds = algebraSections.map(section => this.createContentSection(section).id);
    
    // Add content items for Linear Equations section
    const linearEquationsItems = [
      {
        sectionId: sectionIds[0],
        title: "Introduction to Linear Equations",
        type: "video",
        duration: "10:23",
        content: "Video content about linear equations",
        order: 1
      },
      {
        sectionId: sectionIds[0],
        title: "Solving One-Step Equations",
        type: "article",
        duration: "15 min",
        content: "Article explaining how to solve basic equations",
        order: 2
      },
      {
        sectionId: sectionIds[0],
        title: "Linear Equations Practice",
        type: "quiz",
        duration: "5 min",
        content: "Quick practice quiz on linear equations",
        order: 3
      }
    ];
    
    linearEquationsItems.forEach(item => this.createContentItem(item));
    
    // Add quiz for Algebra course
    const algebraQuiz = {
      courseId: courseIds[0],
      title: "Algebra Fundamentals Quiz",
      description: "Test your understanding of basic algebraic concepts",
      timeLimit: "20 minutes",
      difficulty: "beginner"
    };
    
    const quizId = this.createQuiz(algebraQuiz).id;
    
    // Add quiz questions
    const algebraQuizQuestions = [
      {
        quizId,
        text: "Solve for x: 3x + 4 = 10",
        options: [
          { id: "a", text: "x = 2" },
          { id: "b", text: "x = 6" },
          { id: "c", text: "x = 1" },
          { id: "d", text: "x = 3" }
        ],
        correctAnswerId: "a",
        explanation: "To solve, subtract 4 from both sides to get 3x = 6, then divide by 3 to get x = 2.",
        order: 1
      },
      {
        quizId,
        text: "Which of the following is a linear function?",
        options: [
          { id: "a", text: "y = x²" },
          { id: "b", text: "y = 2x + 1" },
          { id: "c", text: "y = 1/x" },
          { id: "d", text: "y = √x" }
        ],
        correctAnswerId: "b",
        explanation: "A linear function has the form y = mx + b, where m and b are constants.",
        order: 2
      },
      {
        quizId,
        text: "If f(x) = 3x - 7, what is f(4)?",
        options: [
          { id: "a", text: "5" },
          { id: "b", text: "12" },
          { id: "c", text: "19" },
          { id: "d", text: "-19" }
        ],
        correctAnswerId: "a",
        explanation: "f(4) = 3(4) - 7 = 12 - 7 = 5",
        order: 3
      }
    ];
    
    algebraQuizQuestions.forEach(question => this.createQuizQuestion(question));

    // Also add a biology quiz for the second course
    const biologyQuiz = {
      courseId: courseIds[1],
      title: "Cell Biology Quiz",
      description: "Test your knowledge about cell structure and function",
      timeLimit: "15 minutes",
      difficulty: "beginner"
    };
    
    const bioQuizId = this.createQuiz(biologyQuiz).id;
    
    const biologyQuizQuestions = [
      {
        quizId: bioQuizId,
        text: "Which organelle is responsible for energy production in the cell?",
        options: [
          { id: "a", text: "Nucleus" },
          { id: "b", text: "Mitochondria" },
          { id: "c", text: "Golgi apparatus" },
          { id: "d", text: "Endoplasmic reticulum" }
        ],
        correctAnswerId: "b",
        explanation: "Mitochondria are known as the 'powerhouse of the cell' because they produce ATP, the energy currency of cells.",
        order: 1
      },
      {
        quizId: bioQuizId,
        text: "What is the main function of the cell membrane?",
        options: [
          { id: "a", text: "Store genetic information" },
          { id: "b", text: "Produce proteins" },
          { id: "c", text: "Control what enters and exits the cell" },
          { id: "d", text: "Generate energy" }
        ],
        correctAnswerId: "c",
        explanation: "The cell membrane is selectively permeable, controlling the movement of substances into and out of the cell.",
        order: 2
      }
    ];
    
    biologyQuizQuestions.forEach(question => this.createQuizQuestion(question));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextIds.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.nextIds.categories++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCourseById(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async getFeaturedCourses(limit: number = 3): Promise<Course[]> {
    return Array.from(this.courses.values()).slice(0, limit);
  }
  
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.nextIds.courses++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }
  
  // Content methods
  async getContentSections(courseId: number): Promise<ContentSection[]> {
    return Array.from(this.contentSections.values())
      .filter(section => section.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getContentItems(sectionId: number): Promise<ContentItem[]> {
    return Array.from(this.contentItems.values())
      .filter(item => item.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createContentSection(insertSection: InsertContentSection): Promise<ContentSection> {
    const id = this.nextIds.contentSections++;
    const section: ContentSection = { ...insertSection, id };
    this.contentSections.set(id, section);
    return section;
  }
  
  async createContentItem(insertItem: InsertContentItem): Promise<ContentItem> {
    const id = this.nextIds.contentItems++;
    const item: ContentItem = { ...insertItem, id };
    this.contentItems.set(id, item);
    return item;
  }
  
  // Quiz methods
  async getQuizzesByCourseId(courseId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .filter(quiz => quiz.courseId === courseId);
  }
  
  async getQuizById(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }
  
  async getQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values())
      .filter(question => question.quizId === quizId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.nextIds.quizzes++;
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzes.set(id, quiz);
    return quiz;
  }
  
  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.nextIds.quizQuestions++;
    const question: QuizQuestion = { ...insertQuestion, id };
    this.quizQuestions.set(id, question);
    return question;
  }
  
  // Progress methods
  async getUserProgress(userId: number, courseId: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${courseId}`;
    return this.userProgress.get(key);
  }
  
  async createOrUpdateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.userProgress.has(`${insertProgress.userId}-${insertProgress.courseId}`)
      ? (this.userProgress.get(`${insertProgress.userId}-${insertProgress.courseId}`) as UserProgress).id
      : this.nextIds.userProgress++;
    
    const progress: UserProgress = { ...insertProgress, id };
    this.userProgress.set(`${progress.userId}-${progress.courseId}`, progress);
    return progress;
  }
  
  // Quiz results methods
  async getQuizResult(userId: number, quizId: number): Promise<QuizResult | undefined> {
    const key = `${userId}-${quizId}`;
    return this.quizResults.get(key);
  }
  
  async saveQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.nextIds.quizResults++;
    const result: QuizResult = { ...insertResult, id };
    this.quizResults.set(`${result.userId}-${result.quizId}`, result);
    return result;
  }
}

export const storage = new MemStorage();
