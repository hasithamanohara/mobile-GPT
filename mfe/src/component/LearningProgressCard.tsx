import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LearningProgressCardProps {
  minutesLearned: number;
  totalMinutesGoal: number;
  onMyCoursesPress: () => void;
}

const LearningProgressCard: React.FC<LearningProgressCardProps> = ({
  minutesLearned,
  totalMinutesGoal,
  onMyCoursesPress,
}) => {
  const progressPercentage = (minutesLearned / totalMinutesGoal) * 100;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Learned today</Text>
        <TouchableOpacity onPress={onMyCoursesPress}>
          <Text style={styles.myCoursesText}>My courses</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContent}>
        <Text style={styles.minutesText}>{minutesLearned}min</Text>
        <Text style={styles.totalMinutesText}> / {totalMinutesGoal}min</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  myCoursesText: {
    fontSize: 14,
    color: '#4A4AFF',
    fontWeight: '600',
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  minutesText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  totalMinutesText: {
    fontSize: 18,
    color: '#666',
    marginLeft: 5,
    marginBottom: 2,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden', 
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A4AFF', 
    borderRadius: 4,
  },
});

export default LearningProgressCard;
