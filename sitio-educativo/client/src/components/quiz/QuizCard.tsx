import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Clock, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    description: string;
    questionCount: number;
    timeLimit: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed?: boolean;
    score?: number;
  };
  courseId: string;
}

const QuizCard = ({ quiz, courseId }: QuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg">{quiz.title}</CardTitle>
          <Badge
            className={getDifficultyColor(quiz.difficulty)}
            variant="outline"
          >
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {quiz.description}
        </p>
        
        <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <HelpCircle className="h-4 w-4 mr-1" />
            <span>{quiz.questionCount} questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{quiz.timeLimit}</span>
          </div>
        </div>
        
        {quiz.completed && (
          <div className="mt-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-sm">
              Completed with score: <strong>{quiz.score}%</strong>
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/quiz/${quiz.id}`}>
            {quiz.completed ? "Retake Quiz" : "Start Quiz"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
