import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "@/components/content/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: featuredCourses, isLoading } = useQuery({
    queryKey: ["/api/courses/featured"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Expande Tu Conocimiento
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre cursos interactivos, contenido atractivo y pon a prueba tus conocimientos con nuestra plataforma de aprendizaje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/courses">Explorar Cursos</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/">Saber Más</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Cursos Destacados</h2>
            <Button variant="outline" asChild>
              <Link href="/courses">Ver Todos</Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-32 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses?.map((course: any) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir nuestro sitio educativo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 2v8"></path>
                      <path d="M12 18v4"></path>
                      <path d="M4.93 10.93l1.41 1.41"></path>
                      <path d="M17.66 11.7l1.14-2.14"></path>
                      <path d="M2 18h2"></path>
                      <path d="M20 18h2"></path>
                      <path d="M12 10a2 2 0 0 0-2 2"></path>
                      <path d="M12 10V8.91"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Aprendizaje Interactivo</h3>
                  <p className="text-muted-foreground">
                    Interactúa con contenido a través de ejercicios interactivos y cuestionarios que refuerzan tu comprensión.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M9 9h6v6H9z"></path>
                      <path d="M12 3v18"></path>
                      <path d="M3 12h18"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Contenido Completo</h3>
                  <p className="text-muted-foreground">
                    Accede a materiales educativos bien estructurados que cubren una amplia gama de temas y asignaturas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      <path d="M19 16v3"></path>
                      <path d="M19 22v.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Evalúa Tus Conocimientos</h3>
                  <p className="text-muted-foreground">
                    Evalúa tu progreso con cuestionarios y pruebas diseñadas para ayudarte a identificar áreas de mejora.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Empezar a Aprender?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explora nuestros cursos hoy y da el primer paso hacia la expansión de tus conocimientos y habilidades.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/courses">Comenzar</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
