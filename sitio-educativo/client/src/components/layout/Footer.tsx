import { Link } from "wouter";
import logoImg from "../../assets/logo_ldsw_plus.png";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 border-t">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img 
                src={logoImg} 
                alt="Logo LDSW" 
                className="h-6" 
              />
              <span className="font-bold text-xl">Sitio Educativo Proyecto II</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Proporcionamos contenido educativo de alta calidad y experiencias de aprendizaje interactivas para ayudarte a tener éxito.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Todos los Cursos
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Rutas de Aprendizaje
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Materiales de Estudio
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sitio Educativo Proyecto II. Todos los derechos reservados.
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Desarrollada por Jessica Nayeli Joselinne Cuellar Rivera 224065839 y Aldo Guerrero Ortega 222353187
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
