import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types/Types';
import { getToken, getUser } from '../utils/Storage';

import AuthInputFields from '../component/AuthInputFeild';
import AuthButton from '../component/AuthButton';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, setUser, isLoading } = useContext(AuthContext);
  const [username, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      checkAuthAndNavigate();
    } catch (error: any) {
      console.error('Login failed in LoginScreen:', error);
    }
  };

  const handleSignUpRedirect = () => {
    console.log('Navigating to Sign Up screen');
    navigation.navigate('SignUp');
  };

  const checkAuthAndNavigate = async () => {
    try {
      const token = await getToken();
      const savedUser = await getUser();

      if (token && savedUser) {
        navigateBasedOnRole(savedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const navigateBasedOnRole = (user: User) => {
    if (user.role === 'instructor') {
      navigation.replace('InstructorMain', { screen: "InstructorHome" });
    } else if (user.role === 'student') {
      navigation.replace('StudentMain', { screen: 'Home' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log In</Text>
        <Text style={styles.headerSubtitle}>Welcome back! Please log in to continue</Text>
      </View>

      <AuthInputFields
        email={username}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <AuthButton title="Log In" onPress={handleLogin} loading={isLoading} />

      <View style={styles.signUpLinkContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUpRedirect}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4A4AFF',
    fontWeight: '600',
  },
  signUpLinkContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  signUpLink: {
    fontSize: 16,
    color: '#4A4AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
