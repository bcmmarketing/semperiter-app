
import { Mail, MapPin, Clock, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div className="container max-w-6xl mx-auto pt-24 pb-16 px-4 flex justify-center">
      <div className="bg-background dark:bg-slate-900/80 rounded-xl shadow-sm border dark:border-slate-700 p-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-8 bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent dark:text-brand-yellow text-center">
          Información de contacto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="flex items-start">
              <Mail className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">info@semperiter.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Respondemos en 24-48 horas laborables
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Help Center</h3>
                <p className="text-muted-foreground">Si tienes algún problema con tu contenido, no dudes en contactarnos.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <MapPin className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Ubicación</h3>
                <p className="text-muted-foreground">Madrid, España</p>
              </div>
            </div>

            <div className="flex items-start">
              <Instagram className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Instagram</h3>
                <a 
                  href="https://instagram.com/semperiter" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @semperiter
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  Síguenos para ver las mejores fotos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
