import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LogInScreen';
import CreateCourseScreen from '../screens/InstructorCreateCourse';
import EditCourseScreen from '../screens/InstructorEditCoures';
import DeleteCourseScreen from '../screens/InstructorDeleteCourse';

// Navigation Components
import BottomNavBar from '../component/BottomNavBAr';
import InstructorBottomNavBar from '../component/InstructorBottomNavBar';

import { RootStackParamList } from '../types/Navigation';
import { AuthContext } from '../context/AuthContext';
import EditAccountScreen from '../screens/EditAccountData';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext);

  const getInitialRoute = () => {
    if (isLoading) return "Splash";
    if (!user) return "Login";
    return user.role === 'instructor' ? "InstructorMain" : "StudentMain";
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={getInitialRoute()}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="StudentMain" component={BottomNavBar} />
      <Stack.Screen name="InstructorMain" component={InstructorBottomNavBar} />
      <Stack.Screen name="CreateCourse" component={CreateCourseScreen} />
      <Stack.Screen name="EditCourse" component={EditCourseScreen} />
      <Stack.Screen name="DeleteCourse" component={DeleteCourseScreen} />
      <Stack.Screen name='EditAccount' component={EditAccountScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigator;