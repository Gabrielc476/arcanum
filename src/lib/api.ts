import axios from 'axios';
import { Player } from '../types';

// Crie uma instância do Axios com a URL base da sua API
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api',
});

// Adicione um interceptor para incluir o token JWT em todas as requisições, se ele existir
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Funções de Autenticação ---

export const registerPlayer = async (userData: any) => {
  const response = await apiClient.post('/players/register', userData);
  return response.data;
};

export const loginPlayer = async (credentials: any): Promise<{ token: string, player: Player }> => {
  const response = await apiClient.post('/players/login', credentials);
  return response.data;
};

// --- Funções do Jogo (para o futuro) ---

export const getGameState = async (): Promise<Player> => {
  const response = await apiClient.get('/game/state');
  return response.data;
}

export default apiClient;
