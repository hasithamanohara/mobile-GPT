import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface InstructorSummaryCardProps {
  totalCourses: number;
  totalStudents: number;
  onViewAllCoursesPress: () => void; 
}

const InstructorSummaryCard: React.FC<InstructorSummaryCardProps> = ({
  totalCourses,
  totalStudents,
  onViewAllCoursesPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Summary</Text>
        <TouchableOpacity onPress={onViewAllCoursesPress}>
          <Text style={styles.linkText}>View All Courses</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Feather name="book" size={24} color="#4A4AFF" />
          <Text style={styles.metricValue}>{totalCourses}</Text>
          <Text style={styles.metricLabel}>Total Courses</Text>
        </View>

        <View style={styles.metricSeparator} />

        <View style={styles.metricItem}>
          <Feather name="users" size={24} color="#FF8C00" />
          <Text style={styles.metricValue}>{totalStudents}</Text>
          <Text style={styles.metricLabel}>Total Students</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  linkText: {
    fontSize: 14,
    color: '#4A4AFF',
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  metricSeparator: {
    width: 1,
    height: '80%', 
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
});

export default InstructorSummaryCard;
