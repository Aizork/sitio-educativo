import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, BookOpen, BarChart } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    categoryName: string;
    level: string;
    duration: string;
    lessons: number;
    progress?: number;
    imageUrl?: string;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video w-full bg-muted relative">
        {course.imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${course.imageUrl})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary opacity-50" />
          </div>
        )}
        
        <Badge
          variant="secondary"
          className="absolute top-2 right-2"
        >
          {course.level}
        </Badge>
      </div>
      
      <CardHeader className="flex-none">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold line-clamp-2">{course.title}</h3>
          <Badge>{course.categoryName}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {course.description}
        </p>
        
        <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{course.lessons} lecciones</span>
          </div>
        </div>
        
        {course.progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progreso</span>
              <span>{course.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex-none pt-0">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.id}`}>
            {course.progress !== undefined && course.progress > 0 
              ? "Continuar Aprendizaje" 
              : "Comenzar Aprendizaje"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
