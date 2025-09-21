import { useContext } from 'react';
// Certifique-se de que o caminho de importação está correto
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook customizado para aceder ao AuthContext.
 * Fornece uma forma limpa e segura de consumir o estado de autenticação.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
