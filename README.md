# Semperiter - Plataforma de Compartición de Viajes

## 📝 Descripción

Semperiter es una aplicación web moderna para compartir experiencias de viaje a través de fotografías. Los usuarios pueden explorar destinos, subir sus propias fotos y gestionar su contenido en un dashboard personalizado.

## 🛠️ Tecnologías

### Frontend
- **React** (v18.2.0)
- **TypeScript** (v5.0.2)
- **Vite** (v4.4.5)
- **TailwindCSS** (v3.3.3)
- **shadcn/ui** (v0.4.0)
- **Lucide Icons** (v0.284.0)
- **React Router DOM** (v6.15.0)
- **React Query** (v4.33.0)
- **Axios** (v1.5.0)
- **Zod** (v3.22.2)

### Dependencias de Desarrollo
- **ESLint** (v8.45.0)
- **Prettier** (v3.0.1)
- **PostCSS** (v8.4.28)
- **Autoprefixer** (v10.4.14)

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ui/            # Componentes de UI reutilizables
│   ├── admin/         # Componentes específicos del panel admin
│   └── dashboard/     # Componentes del dashboard de usuario
├── contexts/          # Contextos de React (Auth, Theme)
├── hooks/             # Hooks personalizados
├── lib/              # Utilidades y configuraciones
├── pages/            # Páginas de la aplicación
└── types/            # Definiciones de tipos TypeScript
```

## 📋 Características

### Públicas
- Exploración de destinos con vista de galería y mapa
- Visualización detallada de destinos
- Registro y login de usuarios
- Búsqueda y filtrado de destinos

### Usuario Autenticado
- Subida de fotos
- Dashboard personal
- Gestión de perfil
- Likes y favoritos

### Administrador
- Panel de administración
- Gestión de usuarios
- Gestión de destinos
- Estadísticas y métricas

## 🎨 Diseño y UI

### Tema
- Sistema de tema claro/oscuro
- Colores personalizados con variables CSS
- Diseño responsive

### Componentes
- Navbar con menú responsive
- Footer con enlaces y redes sociales
- Cards para destinos y fotos
- Formularios con validación
- Modales y diálogos
- Toasts para notificaciones

## 🚀 Instalación y Configuración

1. **Requisitos Previos**
   ```bash
   node >= 16.0.0
   npm >= 7.0.0
   ```

2. **Instalación**
   ```bash
   git clone <repositorio>
   cd semperiter
   npm install
   ```

3. **Variables de Entorno**
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_UNSPLASH_ACCESS_KEY=tu_clave_de_unsplash
   ```

4. **Desarrollo**
   ```bash
   npm run dev
   ```

5. **Producción**
   ```bash
   npm run build
   npm run preview
   ```

## 📚 API y Backend

### Endpoints Principales
- `/api/auth/*` - Autenticación
- `/api/destinations/*` - CRUD de destinos
- `/api/users/*` - Gestión de usuarios
- `/api/photos/*` - Gestión de fotos
- `/api/admin/*` - Endpoints de administración

### Modelos de Datos
- Users
- Destinations
- Photos
- Categories
- Comments
- Likes

## 🔐 Seguridad

- JWT para autenticación
- Roles de usuario (admin, user)
- Validación de formularios con Zod
- Sanitización de inputs
- Protección de rutas

## 🌐 SEO y Rendimiento

- Meta tags dinámicos
- Lazy loading de imágenes
- Code splitting
- Optimización de assets
- Caché de consultas con React Query

## 📱 Responsive Design

- Mobile First
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Añade mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Crea un Pull Request

## 📄 Licencia

MIT
