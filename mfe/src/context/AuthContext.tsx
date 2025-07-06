import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '../types/Types';
import { getToken, saveToken, removeToken, saveUser, getUser, removeUser } from '../utils/Storage';
import { login as apiLogin, updateUserData, register as createUser } from '../api/ApiCalls';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  login: async () => { },
  logout: async () => { },
  isAuthenticated: false,
  isLoading: true,
  updateUser: async () => { },
  register: async () => { }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(username, password);
      const token = response.data.token;
      const user = response.data.user;

      console.log(user);

      await saveToken(token);
      await saveUser(user);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, email: string, password: string, role: 'student' | 'instructor') => {
    setIsLoading(true);
    try {
      const response = await createUser(username, email, password, role);
      const token = response.data.token;
      const user = response.data.user;

      console.log(user);

      await saveToken(token);
      await saveUser(user);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const logout = useCallback(async () => {
    await removeToken();
    await removeUser();
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        const savedUser = await getUser();
        if (token != null && savedUser != null) {
          setUser(savedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Failed to load user from token:', error);
        await removeToken();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const updateUser = useCallback(async (updatedUserData: Partial<User>) => {
    if (!user) return;

    try {
      const updatePayload: Partial<User> = {};

      if (updatedUserData.username && updatedUserData.username !== user.username) {
        updatePayload.username = updatedUserData.username;
      }

      if (updatedUserData.email && updatedUserData.email !== user.email) {
        updatePayload.email = updatedUserData.email;
      }

      if (Object.keys(updatePayload).length > 0) {
        await updateUserData(updatePayload.username || user.username, updatePayload.email || user.email);

        const newUser = { ...user, ...updatePayload };
        await saveUser(newUser);
        setUser(newUser);

        console.log('User updated successfully');
      } else {
        console.log('No changes detected for update');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }, [user]);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        isLoading,
        updateUser,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};