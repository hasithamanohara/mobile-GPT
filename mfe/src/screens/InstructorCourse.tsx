import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import GenericHeader from '../component/GenericHeader';
import CourseCard from '../component/CourseCard';
import { CompositeNavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InstructorBottomTabParamList, RootStackParamList } from '../types/Navigation';
import { Feather } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type InsCourseScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<InstructorBottomTabParamList, 'InstructorCourses'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface InstructorCourse {
  id: string;
  name: string;
  instructor: string;
  description: string;
  duration: number;
  image?: string;
}

const InstructorCoursesScreen: React.FC = () => {
  const navigation = useNavigation<InsCourseScreenNavigationProp>();
  const route = useRoute();

  const [courses, setCourses] = useState<InstructorCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dummyInstructorCourses: InstructorCourse[] = [
    {
      id: 'inst_c1',
      name: 'Advanced UI/UX Principles',
      instructor: 'Kristin Cooper',
      description: 'hasitha',
      duration: 25,
      image: 'https://placehold.co/90x90/D3D3D3/000000?text=UI/UX',
    }
  ];

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCourses(dummyInstructorCourses);
      } catch (err: any) {
        console.error('Failed to fetch instructor courses:', err);
        setError(`Failed to load courses: ${err.response?.data?.message || err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorCourses();
  }, []);

  const handleCourseCardPress = (courseId: string) => {
    console.log(`Instructor Course card pressed: ${courseId}`);
    navigation.navigate('EditCourse', { courseId: courseId });
  };

  const handleCreateNewCourse = () => {
    console.log('Navigating to Create Course screen');
    navigation.navigate('CreateCourse');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader title="My Courses" showBackButton={false} />

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.createCourseButton} onPress={handleCreateNewCourse}>
            <Feather name="plus-circle" size={20} color="#fff" style={styles.createCourseIcon} />
            <Text style={styles.createCourseButtonText}>Create New Course</Text>
          </TouchableOpacity>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A4AFF" />
              <Text style={styles.loadingText}>Loading your courses...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => { }}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : courses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Feather name="info" size={40} color="#888" />
              <Text style={styles.emptyText}>You haven't created any courses yet.</Text>
              <Text style={styles.emptyText}>Tap "Create New Course" to get started!</Text>
            </View>
          ) : (
            <View style={styles.courseList}>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  courseName={course.name}
                  instructorName={course.instructor}
                  description={course.description}
                  durationHours={course.duration}
                  imageUri={course.image}
                  onPress={() => handleCourseCardPress(course.id)}
                />
              ))}
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
    backgroundColor: '#F0F2F5',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  createCourseButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  createCourseIcon: {
    marginRight: 10,
  },
  createCourseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A4AFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  courseList: {},
});

export default InstructorCoursesScreen;
