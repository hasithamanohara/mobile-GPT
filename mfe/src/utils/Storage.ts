import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/Types';

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

export const removeUser = async () => {
  await AsyncStorage.removeItem('savedUser');
};

export const saveUser = async (user: User) => {
  try {
    const userString = JSON.stringify(user);
    await AsyncStorage.setItem('savedUser', userString);
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem('savedUser');
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
};

