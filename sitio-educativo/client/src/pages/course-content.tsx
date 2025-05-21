import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, BookOpen, FileText, CheckCircle } from "lucide-react";
import ContentBlock from "@/components/content/ContentBlock";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { Skeleton } from "@/components/ui/skeleton";
import QuizCard from "@/components/quiz/QuizCard";

const CourseContent = () => {
  const [, params] = useRoute("/courses/:courseId");
  const courseId = params?.courseId;

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: [`/api/courses/${courseId}`],
  });

  const { data: content, isLoading: isLoadingContent } = useQuery({
    queryKey: [`/api/courses/${courseId}/content`],
  });

  const { data: quizzes } = useQuery({
    queryKey: [`/api/courses/${courseId}/quizzes`],
  });

  if (isLoadingCourse || isLoadingContent) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-6 mr-4" />
          <Skeleton className="h-10 w-1/3" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-8 w-3/4 mb-6" />
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-4" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-32 w-full mb-6" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/courses">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a Cursos
        </Link>
      </Button>

      {course && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <BookOpen className="mr-2 h-4 w-4" />
              <span className="mr-4">{course.lessons} lecciones</span>
              <FileText className="mr-2 h-4 w-4" />
              <span>Nivel: {course.level}</span>
            </div>

            <Tabs defaultValue="content">
              <TabsList className="mb-6">
                <TabsTrigger value="content">Contenido del Curso</TabsTrigger>
                <TabsTrigger value="quizzes">Cuestionarios y Pruebas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-8">
                {content?.map((section: any) => (
                  <ContentBlock key={section.id} content={section} />
                ))}
              </TabsContent>
              
              <TabsContent value="quizzes">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Cuestionarios del Curso</h2>
                  {quizzes?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizzes.map((quiz: any) => (
                        <QuizCard key={quiz.id} quiz={quiz} courseId={courseId} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No hay cuestionarios disponibles para este curso todavía.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Progreso del Curso</h2>
              <ProgressIndicator value={course.progress || 0} />
              <p className="text-sm text-muted-foreground mt-2">
                {course.completedLessons} de {course.lessons} lecciones completadas
              </p>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Última Actividad:</span>
                  <span className="text-sm font-medium">{course.lastActivity || 'Nunca'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Categoría:</span>
                  <span className="text-sm font-medium">{course.categoryName}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Lo Que Aprenderás</h2>
              <ul className="space-y-2">
                {course.learningPoints?.map((point: string, index: number) => (
                  <li key={index} className="flex">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
