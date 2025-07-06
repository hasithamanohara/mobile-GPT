import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import SignUpAuthInputFields from '../component/SignUpAuthInputFields';
import AuthButton from '../component/AuthButton';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types/Types';
import { getToken, getUser } from '../utils/Storage';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { register, setUser } = useContext(AuthContext);

  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    terms: ''
  });

  const validateForm = (): boolean => {
    const newErrors = {
      username: username.trim() ? '' : 'Username is required',
      email: /^\S+@\S+\.\S+$/.test(email) ? '' : 'Valid email is required',
      password: password.length >= 6 ? '' : 'Password must be at least 6 characters',
      terms: agreedToTerms ? '' : 'You must agree to the terms'
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await register(username, email, password, role);
      checkAuthAndNavigate();
      setLoading(false);
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Could not create account. Please try again."
      );
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
      console.log("finally block");
    }
  };

  const checkAuthAndNavigate = async () => {
    try {
      const token = await getToken();
      const savedUser = await getUser();
      console.log(token);

      if (token != null && savedUser != null) {
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


  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.screenContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.headerSubtitle}>Enter your details below & free sign up</Text>
      </View>

      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>I am a:</Text>
        <TouchableOpacity
          style={[styles.roleButton, role === 'student' && styles.activeRoleButton]}
          onPress={() => setRole('student')}
        >
          <Text style={role === 'student' ? styles.activeRoleText : styles.roleText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'instructor' && styles.activeRoleButton]}
          onPress={() => setRole('instructor')}
        >
          <Text style={role === 'instructor' ? styles.activeRoleText : styles.roleText}>Instructor</Text>
        </TouchableOpacity>
      </View>

      <SignUpAuthInputFields
        username={username}
        setUsername={setUserName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showUsername={true}
      />

      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <View style={styles.termsContainer}>
        <Checkbox
          value={agreedToTerms}
          onValueChange={setAgreedToTerms}
          color={agreedToTerms ? '#4A4AFF' : '#888'}
          style={styles.checkbox}
        />
        <Text style={styles.termsText}>
          By creating an account you have to agree with our{' '}
          <Text style={styles.termsLink}>terms & conditions.</Text>
        </Text>
      </View>
      {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

      <AuthButton
        title={loading ? "Creating Account..." : "Create Account"}
        onPress={handleCreateAccount}
        loading={loading}
      />

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={styles.loginLink}>Log In</Text>
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
    marginBottom: 20,
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
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 16,
    marginRight: 15,
    color: '#333',
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  activeRoleButton: {
    backgroundColor: '#4A4AFF',
    borderColor: '#4A4AFF',
  },
  roleText: {
    color: '#666',
  },
  activeRoleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  termsLink: {
    color: '#4A4AFF',
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#4A4AFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});

export default SignUpScreen;
