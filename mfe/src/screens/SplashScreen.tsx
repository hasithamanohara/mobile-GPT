import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { getToken, getUser } from '../utils/Storage';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types/Types';
import { jwtDecode } from 'jwt-decode';

const { width } = Dimensions.get('window');

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { setUser } = useContext(AuthContext);

  const checkAuthAndNavigate = async () => {
    try {
      const token = await getToken();
      const savedUser = await getUser();

      if (!token || !savedUser) {
        console.log(savedUser);
        return navigateToLogin();
      }

      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        console.warn('Token expired');
        return navigateToLogin();
      }

      setUser(savedUser);
      navigateBasedOnRole(savedUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      navigateToLogin();
    }
  };

  const navigateBasedOnRole = (user: User) => {
    if (user.role === 'instructor') {
      navigation.replace('InstructorMain', { screen: "InstructorHome" });
    } else if (user.role === 'student') {
      navigation.replace('StudentMain', { screen: 'Home' });
    } else {
      setUser(null);
    }
  };

  const navigateToLogin = () => {
    navigation.replace('Login');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("11")
      checkAuthAndNavigate();
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, setUser]);

  const handleSkip = () => {
    console.log('Skip button pressed!');
    checkAuthAndNavigate();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require('../../assets/SplashScreenImage.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Quick and easy learning</Text>

        <Text style={styles.description}>
          Easy and fast learning at any time to help you improve various skills
        </Text>

        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    borderRadius: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  paginationDots: {
    flexDirection: 'row',
    marginTop: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 25,
    backgroundColor: '#6A5ACD',
  },
});

export default SplashScreen;
