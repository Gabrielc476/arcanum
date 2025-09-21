'use client';

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios'; // Importado para um tratamento de erros mais seguro
import { Player } from '../types';
import { registerPlayer, loginPlayer } from '../lib/api';
import { useRouter } from 'next/navigation';

// --- Tipos e Estado ---

// Tipos específicos para os formulários para evitar o uso de "any"
export interface RegisterUserData {
  name: string;
  email: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

interface AuthState {
  token: string | null;
  player: Player | null;
  isLoading: boolean;
  error: string | null;
}
type AuthAction =
  | { type: 'REQUEST_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; player: Player } }
  | { type: 'REQUEST_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS' };

const initialState: AuthState = {
  token: null,
  player: null,
  isLoading: true,
  error: null,
};

// --- Reducer ---
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        player: action.payload.player,
        error: null,
      };
    case 'REQUEST_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'REGISTER_SUCCESS':
      return { ...state, isLoading: false, error: null };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
};

// --- Contexto ---
interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provedor ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Efeitos do localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('jwt_token');
      const playerJson = localStorage.getItem('player_data');
      if (token && playerJson) {
        const player = JSON.parse(playerJson);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token, player } });
      } else {
        dispatch({ type: 'REQUEST_FAILURE', payload: '' });
      }
    } catch (_error) { // Corrigido: variável não utilizada
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  useEffect(() => {
    if (state.token && state.player) {
      localStorage.setItem('jwt_token', state.token);
      localStorage.setItem('player_data', JSON.stringify(state.player));
    } else {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('player_data');
    }
  }, [state.token, state.player]);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      const { token, player } = await loginPlayer(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, player } });
      router.push('/game');
    } catch (err: unknown) { // Corrigido: tratamento de erro mais seguro
      let errorMessage = 'Falha no login.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || errorMessage;
      }
      dispatch({ type: 'REQUEST_FAILURE', payload: errorMessage });
    }
  };

  const register = async (userData: RegisterUserData) => {
    dispatch({ type: 'REQUEST_START' });
    try {
      await registerPlayer(userData);
      dispatch({ type: 'REGISTER_SUCCESS' });
      router.push('/login');
    } catch (err: unknown) { // Corrigido: tratamento de erro mais seguro
      let errorMessage = 'Falha no registo.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || errorMessage;
      }
      dispatch({ type: 'REQUEST_FAILURE', payload: errorMessage });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

