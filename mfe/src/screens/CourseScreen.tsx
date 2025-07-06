import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, StudentBottomTabParamList } from '../types/Navigation';

import GenericHeader from '../component/GenericHeader';
import CourseCard from '../component/CourseCard';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const dummyEnrolledCourses = [
  {
    id: 'e2',
    name: 'UI/UX Fundamentals',
    instructor: 'Jane Doe',
    description: "hasitha",
    duration: 20,
    image: 'https://placehold.co/90x90/90EE90/000000?text=UI/UX',
  },
];

const dummyUnenrolledCourses = [
  {
    id: 'u1',
    name: 'Packaging Design Basics',
    instructor: 'John Smith',
    description: "hasitha",
    duration: 10,
    image: 'https://placehold.co/90x90/FFB6C1/000000?text=Pack+Design',
  },
];

type CourseScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<StudentBottomTabParamList, 'Course'>,
  NativeStackNavigationProp<RootStackParamList>
>;
const CourseScreen: React.FC = () => {
  const navigation = useNavigation<CourseScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'enrolled' | 'all'>('enrolled');

  const handleCourseCardPress = (courseId: string) => {
    console.log(`Course card pressed: ${courseId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader title="My Courses" showBackButton={false} />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'enrolled' && styles.activeTabButton]}
            onPress={() => setActiveTab('enrolled')}
          >
            <Text style={[styles.tabText, activeTab === 'enrolled' && styles.activeTabText]}>
              Enrolled Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'all' && styles.activeTabButton]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All Courses
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {activeTab === 'enrolled' ? (
            <View style={styles.courseList}>
              {dummyEnrolledCourses.length > 0 ? (
                dummyEnrolledCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    courseName={course.name}
                    instructorName={course.instructor}
                    description={course.description}
                    durationHours={course.duration}
                    imageUri={course.image}
                    onPress={() => handleCourseCardPress(course.id)}
                  />
                ))
              ) : (
                <Text style={styles.noCoursesText}>You are not enrolled in any courses yet.</Text>
              )}
            </View>
          ) : (
            <View style={styles.courseList}>
              {dummyUnenrolledCourses.length > 0 ? (
                dummyUnenrolledCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    courseName={course.name}
                    instructorName={course.instructor}
                    description={course.description}
                    durationHours={course.duration}
                    imageUri={course.image}
                    onPress={() => handleCourseCardPress(course.id)}
                  />
                ))
              ) : (
                <Text style={styles.noCoursesText}>No other courses available at the moment.</Text>
              )}
            </View>
          )}
          <View style={{ height: 100 }} /> 
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', 
  },
  scrollViewContent: {
    flex: 1,
    padding: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#4A4AFF', 
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888', 
  },
  activeTabText: {
    color: '#fff', 
  }, courseList: {
  },
  noCoursesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CourseScreen;
