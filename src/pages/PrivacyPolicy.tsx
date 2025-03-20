import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-slate max-w-none">
            <p>Última actualización: {new Date().toLocaleDateString()}</p>
            
            <h2>Información que recopilamos</h2>
            <p>
              Recopilamos información que usted nos proporciona directamente:
            </p>
            <ul>
              <li>Información de la cuenta (email, nombre de usuario)</li>
              <li>Contenido que sube (fotos y ubicaciones)</li>
              <li>Comunicaciones con nosotros</li>
            </ul>

            <h2>Cómo utilizamos su información</h2>
            <ul>
              <li>Para proporcionar y mantener nuestro servicio</li>
              <li>Para mejorar la experiencia del usuario</li>
              <li>Para comunicarnos con usted</li>
              <li>Para detectar y prevenir actividades fraudulentas</li>
            </ul>

            <h2>Compartición de datos</h2>
            <p>
              No vendemos ni compartimos su información personal con terceros,
              excepto cuando sea necesario para proporcionar nuestros servicios
              o cuando estemos legalmente obligados a hacerlo.
            </p>

            <h2>Sus derechos</h2>
            <p>
              Tiene derecho a:
            </p>
            <ul>
              <li>Acceder a sus datos personales</li>
              <li>Rectificar sus datos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
