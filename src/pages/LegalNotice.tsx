import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LegalNotice = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>
          
          <div className="prose prose-slate max-w-none">
            <p>Última actualización: {new Date().toLocaleDateString()}</p>
            
            <h2>Información General</h2>
            <p>
              Travel Pic Pioneer es una plataforma web propiedad de [Nombre de la Empresa],
              con domicilio social en [Dirección] y CIF [Número].
            </p>

            <h2>Condiciones de Uso</h2>
            <p>
              El acceso y uso de esta web está sujeto a las presentes condiciones de uso.
              El uso de la web implica la aceptación plena y sin reservas de todas las
              condiciones incluidas en este Aviso Legal.
            </p>

            <h2>Propiedad Intelectual</h2>
            <p>
              Los derechos de propiedad intelectual de esta web, su código fuente,
              diseño, estructuras de navegación y los distintos elementos en ella
              contenidos son titularidad de [Nombre de la Empresa].
            </p>

            <h2>Responsabilidad</h2>
            <p>
              [Nombre de la Empresa] no se hace responsable de los daños y perjuicios
              derivados de la inexactitud, inadecuación o incorrección de los contenidos
              publicados por los usuarios en la plataforma.
            </p>

            <h2>Legislación Aplicable</h2>
            <p>
              El presente Aviso Legal se rige por la legislación española.
              Cualquier controversia será resuelta ante los juzgados y tribunales de [Ciudad].
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalNotice;
