// App Constants
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data'
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Lost & Found',
  VERSION: '1.0.0'
};
