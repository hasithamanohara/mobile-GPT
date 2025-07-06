export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'instructor';
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: { _id: string; username: string };
  content?: string;
  students?: string[];
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: 'student' | 'instructor';
  };
  token: string;
}

export interface GPTResponse {
  data(data: any): unknown;
  recommendations: string;
}

export interface AuthInputFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export interface SignUpAuthInputFieldsProps {
  username: string;
  setUsername: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  showUsername?: boolean;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (updatedUserData: Partial<User>) => void;
  register: (userName: string, email: string, password: string, role: 'student' | 'instructor') => Promise<void>;
}


