import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Support = () => {
  const faqs = [
    {
      question: "¿Cómo puedo subir mis fotos?",
      answer: "Para subir tus fotos, ve a la sección 'Subir' en el menú principal. Puedes arrastrar y soltar tus fotos o hacer clic para seleccionarlas. Asegúrate de que las fotos estén en formato JPG, PNG o WEBP y no excedan los 10MB por archivo."
    },
    {
      question: "No puedo ver mis fotos después de subirlas",
      answer: "Si no puedes ver tus fotos después de subirlas, verifica: 1) Que la subida se completó correctamente (deberías ver un mensaje de confirmación), 2) Que estás conectado a internet, 3) Limpia la caché de tu navegador. Si el problema persiste, contáctanos."
    },
    {
      question: "¿Por qué el mapa no carga correctamente?",
      answer: "Si el mapa no carga, puede deberse a: 1) Problemas de conexión a internet, 2) Bloqueo de cookies o JavaScript en tu navegador, 3) Uso de un navegador no compatible. Recomendamos usar la última versión de Chrome, Firefox, Safari o Edge."
    },
    {
      question: "¿Cómo puedo editar la ubicación de mis fotos?",
      answer: "Actualmente, la ubicación de las fotos se establece al momento de la subida. Si necesitas modificar la ubicación, deberás eliminar la foto y subirla nuevamente con la ubicación correcta. Estamos trabajando en una función de edición para futuras actualizaciones."
    },
    {
      question: "Los filtros de búsqueda no funcionan",
      answer: "Si los filtros no funcionan correctamente: 1) Asegúrate de hacer clic en 'Aplicar Filtros' después de seleccionar tus preferencias, 2) Intenta limpiar los filtros y aplicarlos nuevamente, 3) Actualiza la página. Si el problema continúa, contáctanos."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Centro de Soporte</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">¿Necesitas más ayuda?</h2>
            <p className="text-gray-600 mb-6">
              Si no has encontrado la solución a tu problema, nuestro equipo de soporte está aquí para ayudarte.
              Tiempo de respuesta estimado: 24-48 horas hábiles.
            </p>
            <Button asChild>
              <a href="mailto:soporte@travelpicpioneer.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contactar Soporte
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
