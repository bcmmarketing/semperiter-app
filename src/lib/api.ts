import axios from 'axios';

// Determinar la URL base según el entorno
const getBaseUrl = () => {
  const host = window.location.hostname;
  if (host === '127.0.0.1' || host === 'localhost') {
    return 'http://127.0.0.1:3000/api';
  }
  return 'http://localhost:3000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  try {
    console.log('Enviando solicitud de login:', { email, password });
    const response = await api.post('/auth/login', { email, password });
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error en login:', error.response?.data || error);
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (token: string) => {
  try {
    const response = await api.post('/auth/google', { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
