import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, StudentBottomTabParamList } from '../types/Navigation';

import AppHeader from '../component/Header';
import LearningProgressCard from '../component/LearningProgressCard';
import LearningPromptCard from '../component/TodayLearnSuggest';
import MeetupCard from '../component/Meetup';
import LearningPlanItem from '../component/LearningPlan';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<StudentBottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useContext(AuthContext);

  const handleMyCoursesPr = () => {
    navigation.navigate("Course");
  };

  const handleGetStartedPress = () => {
    console.log('Get Started pressed for learning prompt');
  };

  const learningPlan = [
    { id: '1', name: 'Packaging Design', completed: 40, total: 48 },
    { id: '2', name: 'Product Design', completed: 6, total: 24 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader userName= {user?.username ?? "Guest"}/>

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View>
            <LearningProgressCard
              minutesLearned={46}
              totalMinutesGoal={60}
              onMyCoursesPress={handleMyCoursesPr}
            />
          </View>

          <LearningPromptCard onGetStartedPress={handleGetStartedPress} />
          <Text style={styles.sectionTitle}>Learning Plan...</Text>
          <View style={styles.learningPlanList}>
            {learningPlan.map((item) => (
              <LearningPlanItem
                key={item.id}
                courseName={item.name}
                progressNumerator={item.completed}
                progressDenominator={item.total}
              />
            ))}
          </View>

          <MeetupCard />

          <View style={{ height: 150 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4A4AFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollViewContent: {
    flex: 1,
    paddingTop: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  learningPlanList: {
    marginHorizontal: 20,
  },
});

export default HomeScreen;
