import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { AuthContext } from '../context/AuthContext';
import InstructorSummaryCard from '../component/InstructorSummaryCard';
import InstructorActionCard from '../component/InstructorActionCard';
import CourseCard from '../component/CourseCard';
import { Feather } from '@expo/vector-icons';

type InstructorHomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InstructorMain'>;

interface InstructorCourseOverview {
  id: string;
  name: string;
  instructor: string;
  description: string;
  duration: number;
  image?: string;
}

const InstructorHomeScreen: React.FC = () => {
  const navigation = useNavigation<InstructorHomeScreenNavigationProp>();
  const { user, isLoading: authLoading } = useContext(AuthContext);

  const [recentCourses, setRecentCourses] = useState<InstructorCourseOverview[]>([]);
  const [totalCoursesCount, setTotalCoursesCount] = useState<number>(0);
  const [totalStudentsCount, setTotalStudentsCount] = useState<number>(0);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dummyRecentCourses: InstructorCourseOverview[] = [
    {
      id: 'inst_c1',
      name: 'Advanced UI/UX Principles',
      instructor: user?.username || 'Instructor',
      description: "description",
      duration: 25,
      image: 'https://placehold.co/90x90/D3D3D3/000000?text=UI/UX',
    },
    {
      id: 'inst_c2',
      name: 'React Native Deep Dive',
      instructor: user?.username || 'Instructor',
      description: "description",
      duration: 30,
      image: 'https://placehold.co/90x90/ADD8E6/000000?text=RN',
    },
  ];

  const dummyTotalCourses = 5;
  const dummyTotalStudents = 120;

  useEffect(() => {
    const fetchInstructorDashboardData = async () => {
      setIsDataLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTotalCoursesCount(dummyTotalCourses);
        setTotalStudentsCount(dummyTotalStudents);
        setRecentCourses(dummyRecentCourses);
      } catch (err: any) {
        console.error('Failed to fetch instructor dashboard data:', err);
        setError(`Failed to load dashboard: ${err.response?.data?.message || err.message}`);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (!authLoading && user && user.role === 'instructor') {
      fetchInstructorDashboardData();
    }
  }, [user, authLoading]);

  const handleViewAllCourses = () => {
    navigation.navigate('InstructorMain', { screen: 'InstructorCourses' });
  };

  const handleCreateNewCourse = () => {
    navigation.navigate('CreateCourse');
  };

  const handleCourseCardPress = (courseId: string) => {
    navigation.navigate('EditCourse', { courseId: courseId });
  };

  if (authLoading || !user || isDataLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.loadingOverlay]}>
          <ActivityIndicator size="large" color="#4A4AFF" />
          <Text style={styles.loadingText}>Loading instructor dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.errorOverlay]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Text style={styles.hiText}>Hi, {user.username}!</Text>
          <Text style={styles.subtitleText}>Dashboard</Text>
        </View>

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <InstructorSummaryCard
            totalCourses={totalCoursesCount}
            totalStudents={totalStudentsCount}
            onViewAllCoursesPress={handleViewAllCourses}
          />

          <InstructorActionCard
            onCreateCoursePress={handleCreateNewCourse}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Courses</Text>
            <TouchableOpacity onPress={handleViewAllCourses}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentCourses.length === 0 ? (
            <View style={styles.emptyCoursesContainer}>
              <Feather name="info" size={30} color="#888" />
              <Text style={styles.emptyCoursesText}>No recent courses</Text>
              <Text style={styles.emptyCoursesText}>Create a new course</Text>
            </View>
          ) : (
            <View style={styles.recentCoursesList}>
              {recentCourses.map((course) => (
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
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A4AFF',
  },
  errorOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  topHeader: {
    width: '100%',
    paddingHorizontal: 50,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#4A4AFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-start',
  },
  hiText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#E0E0FF',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 50,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllLink: {
    fontSize: 14,
    color: '#4A4AFF',
    fontWeight: '600',
  },
  recentCoursesList: {
    paddingHorizontal: 20,
  },
  emptyCoursesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
  },
  emptyCoursesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default InstructorHomeScreen;
