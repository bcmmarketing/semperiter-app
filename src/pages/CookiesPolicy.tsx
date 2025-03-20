import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
          
          <div className="prose prose-slate max-w-none">
            <p>Última actualización: {new Date().toLocaleDateString()}</p>
            
            <h2>¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo mientras navega.
              Se utilizan para recordar sus preferencias y proporcionar una mejor experiencia de usuario.
            </p>

            <h2>¿Qué tipos de cookies utilizamos?</h2>
            <ul>
              <li>
                <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.
              </li>
              <li>
                <strong>Cookies de rendimiento:</strong> Nos ayudan a mejorar el rendimiento del sitio.
              </li>
              <li>
                <strong>Cookies de funcionalidad:</strong> Recuerdan sus preferencias y elecciones.
              </li>
              <li>
                <strong>Cookies de análisis:</strong> Nos ayudan a entender cómo se utiliza el sitio.
              </li>
            </ul>

            <h2>¿Cómo puede controlar las cookies?</h2>
            <p>
              Puede modificar la configuración de su navegador para bloquear o eliminar cookies.
              Sin embargo, esto puede afectar al funcionamiento del sitio.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
