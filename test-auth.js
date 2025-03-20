// Este script prueba la autenticación y las rutas de administración
// Ejecutar en la consola del navegador

// Guardar el token en localStorage
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlOWNjYTNkLWVlZmQtNDNlOS05MDUwLTRhMmFlZTY2Y2E1NiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDIzMTQzNzYsImV4cCI6MTc0MjQwMDc3Nn0.mPIQw5eZWM5ikfXA9u9CXJiG47v6LiPTvNHcmhFlrTs');

// Probar la ruta de estadísticas
fetch('http://localhost:3005/api/admin/stats', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(response => response.json())
.then(data => console.log('Estadísticas:', data))
.catch(error => console.error('Error:', error));
