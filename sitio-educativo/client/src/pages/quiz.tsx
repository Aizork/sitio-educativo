import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const [, params] = useRoute("/quiz/:quizId");
  const quizId = params?.quizId;
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);

  const { data: quiz, isLoading } = useQuery({
    queryKey: [`/api/quizzes/${quizId}`],
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (answers: Record<number, string>) => {
      const response = await apiRequest("POST", `/api/quizzes/${quizId}/submit`, { answers });
      return response.json();
    },
    onSuccess: (data) => {
      setQuizResults(data);
      setQuizSubmitted(true);
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${quiz?.courseId}`] });
      toast({
        title: "¡Cuestionario completado!",
        description: `Has obtenido ${data.score}% en este cuestionario.`,
      });
    },
    onError: () => {
      toast({
        title: "Error al enviar el cuestionario",
        description: "Hubo un problema al enviar tus respuestas. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <Skeleton className="h-4 w-4 mt-0.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Cuestionario no encontrado</h1>
        <p className="text-muted-foreground mb-6">El cuestionario que estás buscando no existe o ha sido eliminado.</p>
        <Button onClick={() => navigate("/courses")}>Volver a Cursos</Button>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = questions.length === Object.keys(selectedAnswers).length;

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    submitQuizMutation.mutate(selectedAnswers);
  };

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = questions[questionIndex].id;
    
    if (quizSubmitted && quizResults) {
      return quizResults.correctAnswers[questionId] === selectedAnswers[questionId]
        ? "correct"
        : "incorrect";
    }
    
    return selectedAnswers[questionId] ? "answered" : "unanswered";
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      
      {/* Quiz Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, index) => {
            const status = getQuestionStatus(index);
            return (
              <button
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? "bg-primary text-primary-foreground"
                    : status === "correct"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : status === "incorrect"
                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    : status === "answered"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-muted text-muted-foreground"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[currentQuestion.id] || ""}
            onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
            disabled={quizSubmitted}
          >
            <div className="space-y-4">
              {currentQuestion.options.map((option: any) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                const isCorrect = quizSubmitted && quizResults?.correctAnswers[currentQuestion.id] === option.id;
                const isIncorrect = quizSubmitted && isSelected && !isCorrect;
                
                return (
                  <div
                    key={option.id}
                    className={`flex items-start space-x-2 p-3 rounded-md ${
                      !quizSubmitted
                        ? isSelected
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                        : isCorrect
                        ? "bg-green-100 dark:bg-green-900/30"
                        : isIncorrect
                        ? "bg-red-100 dark:bg-red-900/30"
                        : "hover:bg-muted"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`option-${option.id}`}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="flex items-start justify-between cursor-pointer"
                      >
                        <span>{option.text}</span>
                        {quizSubmitted && (
                          <span className="ml-2">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : isIncorrect ? (
                              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            ) : null}
                          </span>
                        )}
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
          
          {quizSubmitted && isIncorrect(currentQuestion.id) && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="font-medium">Explicación:</p>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          
          {isLastQuestion ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered || quizSubmitted}
            >
              {quizSubmitted ? "Cuestionario Completado" : "Enviar Respuestas"}
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Results section (visible after submission) */}
      {quizSubmitted && quizResults && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Resultados del Cuestionario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-5xl font-bold mb-2">{quizResults.score}%</div>
                <p className="text-muted-foreground">
                  Has respondido correctamente {quizResults.correctCount} de {questions.length} preguntas.
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Resumen de Desempeño</h3>
                <div className="space-y-2">
                  {quizResults.score >= 80 ? (
                    <p className="text-green-600 dark:text-green-400">
                      ¡Excelente! Tienes una comprensión sólida de este material.
                    </p>
                  ) : quizResults.score >= 60 ? (
                    <p className="text-amber-600 dark:text-amber-400">
                      ¡Buen trabajo! Has entendido muchos conceptos clave, pero hay espacio para mejorar.
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400">
                      Es posible que necesites revisar este material nuevamente para fortalecer tu comprensión.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate(`/courses/${quiz.courseId}`)}
              >
                Volver al Curso
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
  
  function isIncorrect(questionId: number) {
    return quizResults && 
      selectedAnswers[questionId] !== quizResults.correctAnswers[questionId];
  }
};

export default Quiz;
