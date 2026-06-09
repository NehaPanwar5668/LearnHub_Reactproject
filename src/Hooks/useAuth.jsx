import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within AppProvider');
  }

  return {
    user: context.state.user,
    isAuthenticated: context.state.isAuthenticated,
    login: context.login,
    logout: context.logout,
  };
};
