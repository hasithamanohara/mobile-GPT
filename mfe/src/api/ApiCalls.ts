import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthResponse, Course, GPTResponse } from '../types/Types';

const api = axios.create({
  baseURL: 'https://online-learning-api-2t3k.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage for interceptor:', error);
  }
  return config;
});

export const register = async (
  username: string,
  email: string,
  password: string,
  role: 'student' | 'instructor'
) => {
  try {
    console.log('Registering user:', { username, email, role });
    const response = await api.post<AuthResponse>('/api/users/register', {
      username,
      email,
      password,
      role,
    });
    console.log('Registration successful - Status:', response.status);
    return response;
  } catch (error: any) {
    console.error('Registration failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post<AuthResponse>('/api/users/login', { username, password });
    return response;
  } catch (error: any) {
    console.error('Login failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getUserByID = async (userId: string) => {
  try {
    console.log('Fetching user by ID:', userId);
    const response = await api.post<AuthResponse>('/api/users/getUser', { userId });
    console.log('User data fetched:', response.data);
    return response;
  } catch (error: any) {
    console.error('Get user by ID failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const updateUserData = async (username?: string, email?: string) => {
  try {
    const updatePayload: Record<string, string> = {};

    if (username !== undefined) updatePayload.username = username;
    if (email !== undefined) updatePayload.email = email;

    if (Object.keys(updatePayload).length === 0) {
      return;
    }

    console.log('Updating user data with:', updatePayload);
    const response = await api.put<AuthResponse>('/api/users/update', updatePayload);
    console.log('User data updated:', response.data);
    return response;
  } catch (error: any) {
    console.error('Update user data failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    console.log('Deleting user:', userId);
    const response = await api.delete(`/api/users/delete`, { data: { userId } });
    console.log('User deleted successfully:', response.status);
    return response;
  } catch (error: any) {
    console.error('Delete user failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const createCourse = async (
  title: string,
  description: string,
  content: string
): Promise<Course> => {
  try {
    console.log('Creating course:', { title });
    const response = await api.post<Course>('/api/course/createCourse', {
      title,
      description,
      content,
    });
    console.log('Course created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Create course failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const updateCourse = async (
  id: string,
  title: string,
  description: string,
  content: string
): Promise<Course> => {
  try {
    console.log('Updating course:', { id, title });
    const response = await api.put<Course>(`/api/course/${id}`, {
      title,
      description,
      content,
    });
    console.log('Course updated:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Update course failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const deleteCourse = async (id: string): Promise<void> => {
  try {
    console.log('Deleting course:', id);
    await api.delete(`/api/course/${id}`);
    console.log('Course deleted successfully.');
  } catch (error: any) {
    console.error('Delete course failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const enrollCourse = async (id: string): Promise<void> => {
  try {
    console.log('Enrolling in course:', id);
    await api.post(`/api/course/${id}/enroll`);
    console.log('Course enrolled successfully.');
  } catch (error: any) {
    console.error('Enroll course failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getCourses = async () => {
  try {
    console.log('Fetching all courses...');
    const response = await api.get<Course[]>('/api/course/getAllCourese');
    console.log('All courses fetched:', response.data);
    return response;
  } catch (error: any) {
    console.error('Get all courses failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getMyCourses = async () => {
  try {
    console.log('Fetching my enrolled courses (student perspective)...');
    const response = await api.get<Course[]>('/api/course/enrolled');
    console.log('My enrolled courses fetched:', response.data);
    return response;
  } catch (error: any) {
    console.error('Get my enrolled courses failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getInstructorCourses = async () => {
  try {
    console.log('Fetching instructor courses...');
    const response = await api.get<Course[]>('/api/course/getmycourses');
    console.log('Instructor courses fetched:', response.data);
    return response;
  } catch (error: any) {
    console.error('Get instructor courses failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};

export const getCourseRecommendations = async (prompt: string): Promise<GPTResponse> => {
  try {
    console.log('Getting GPT recommendations for prompt:', prompt);
    const response = await api.post<GPTResponse>('/api/gpt/recommend', { prompt });
    console.log('GPT recommendations received:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('GPT recommendations failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method,
    });
    throw error;
  }
};
