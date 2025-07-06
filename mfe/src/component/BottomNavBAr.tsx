import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { StudentBottomTabParamList } from '../types/Navigation';

import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import GPTScreen from '../screens/GPTScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator<StudentBottomTabParamList>();

const StudentBottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: keyof typeof Feather.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Course':
              iconName = 'book-open';
              break;
            case 'GPT':
              iconName = 'search';
              break;
            case 'Account':
              iconName = 'user';
              break;
            default:
              iconName = 'home';
          }

          return (
            <Feather
              name={iconName}
              size={size}
              color={focused ? '#4A4AFF' : '#888'}
            />
          );
        },
        tabBarActiveTintColor: '#4A4AFF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Course" component={CourseScreen} />
      <Tab.Screen name="GPT" component={GPTScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 25,
    paddingTop: 15,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default StudentBottomNavigation;