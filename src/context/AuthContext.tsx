import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '../types';
import { mockUser } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@fitmatch_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    console.log('[AuthContext] Starting to load stored auth');
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      console.log('[AuthContext] Stored auth found:', !!storedAuth);
      if (storedAuth) {
        const { user, token } = JSON.parse(storedAuth);
        console.log('[AuthContext] Token present:', !!token);
        if (token) {
          setState({
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
          });
          console.log('[AuthContext] Set authenticated state');
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,
          });
          console.log('[AuthContext] Set unauthenticated state (no token)');
        }
      } else {
        setState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
        console.log('[AuthContext] Set unauthenticated state (no stored auth)');
      }
    } catch (error) {
      console.log('[AuthContext] Error loading auth:', error);
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: 'Failed to load authentication',
      });
    }
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any credentials
      const user = { ...mockUser, email };
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user,
        token: 'mock_token_' + Date.now(),
      }));
      
      setState({
        isAuthenticated: true,
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.',
      }));
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        ...mockUser,
        id: 'u_' + Date.now(),
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user: newUser,
        token: 'mock_token_' + Date.now(),
      }));
      
      setState({
        isAuthenticated: true,
        user: newUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Signup failed. Please try again.',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!state.user) return;
    
    const updatedUser = { ...state.user, ...updates, updatedAt: new Date() };
    
    try {
      const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const { token } = JSON.parse(storedAuth);
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          user: updatedUser,
          token,
        }));
      }
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
