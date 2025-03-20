# Prompt para Recrear Semperiter

## 🎯 Objetivo
Crear una plataforma web moderna para compartir experiencias de viaje a través de fotografías, con funcionalidades de exploración, gestión de usuarios y panel de administración.

## 🏗️ Estructura Base

1. **Configuración Inicial**
```bash
# Crear proyecto con Vite
npm create vite@latest semperiter -- --template react-ts

# Instalar dependencias principales
npm install @tanstack/react-query axios react-router-dom lucide-react zod @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-toast

# Instalar dependencias de desarrollo
npm install -D tailwindcss postcss autoprefixer @types/node prettier eslint
```

2. **Configuración de TailwindCSS**
```bash
npx tailwindcss init -p
```

3. **Configuración de shadcn/ui**
```bash
npx shadcn-ui@latest init
```

## 📂 Estructura de Carpetas

```
src/
├── components/
│   ├── ui/            # Componentes de shadcn
│   ├── admin/         # Componentes de administración
│   └── dashboard/     # Componentes de usuario
├── contexts/          # Contextos globales
├── hooks/            # Hooks personalizados
├── lib/             # Utilidades
├── pages/           # Páginas principales
└── types/           # Tipos TypeScript
```

## 🎨 Diseño y Temas

1. **Variables CSS (globals.css)**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

## 📱 Componentes Principales

1. **Layout.tsx**
- Navbar con navegación
- Footer con enlaces
- Contenedor principal con padding

2. **Navbar.tsx**
- Logo
- Menú de navegación
- Botones de autenticación
- Menú de usuario

3. **Footer.tsx**
- Enlaces importantes
- Redes sociales
- Información legal

4. **ExploreGallery.tsx**
- Grid de imágenes
- Filtros y búsqueda
- Paginación

5. **Destination.tsx**
- Detalles del destino
- Galería de imágenes
- Información relacionada

## 🔐 Autenticación

1. **AuthContext.tsx**
- Estado de autenticación
- Funciones de login/logout
- Manejo de tokens JWT

2. **PrivateRoute.tsx**
- Protección de rutas
- Redirección a login

## 👤 Panel de Usuario

1. **UserDashboard.tsx**
- Resumen de actividad
- Fotos subidas
- Destinos favoritos

2. **UploadForm.tsx**
- Subida de imágenes
- Formulario de detalles
- Validación con Zod

## 👨‍💼 Panel de Administración

1. **AdminLayout.tsx**
- Sidebar de navegación
- Estadísticas generales

2. **UsersManagement.tsx**
- Lista de usuarios
- Acciones de moderación
- Filtros y búsqueda

3. **DestinationsManagement.tsx**
- CRUD de destinos
- Gestión de categorías
- Moderación de contenido

## 🎯 Características Adicionales

1. **Tema Oscuro**
- Toggle de tema
- Persistencia en localStorage

2. **Notificaciones**
- Sistema de toasts
- Mensajes de error/éxito

3. **Optimización**
- Lazy loading
- Caché de consultas
- Compresión de imágenes

4. **SEO**
- Meta tags dinámicos
- URLs amigables
- Sitemap

## 🔄 Flujo de Trabajo

1. Configurar el proyecto y dependencias
2. Implementar el diseño base y tema
3. Crear componentes principales
4. Implementar autenticación
5. Desarrollar funcionalidades de usuario
6. Crear panel de administración
7. Añadir características adicionales
8. Optimizar y pulir

## 📚 Recursos Necesarios

1. **APIs**
- Backend propio o servicios como Supabase
- Unsplash para imágenes de ejemplo
- Mapbox para mapas

2. **Assets**
- Logo e iconos
- Imágenes de placeholder
- Fuentes (Inter, system-ui)

3. **Herramientas**
- VSCode con extensiones
- Chrome DevTools
- Postman/Insomnia

## 🚀 Despliegue

1. **Build**
```bash
npm run build
```

2. **Plataformas Recomendadas**
- Vercel
- Netlify
- GitHub Pages

## 📝 Notas Importantes

1. **Seguridad**
- Validar inputs
- Sanitizar datos
- Proteger rutas sensibles

2. **Rendimiento**
- Optimizar imágenes
- Minimizar bundles
- Usar lazy loading

3. **Accesibilidad**
- Alt texts
- ARIA labels
- Navegación por teclado

4. **Responsive**
- Mobile first
- Breakpoints consistentes
- Menús adaptables
