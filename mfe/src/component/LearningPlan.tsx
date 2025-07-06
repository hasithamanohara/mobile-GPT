import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

interface LearningPlanItemProps {
  courseName: string;
  progressNumerator: number;
  progressDenominator: number;
}

const LearningPlanItem: React.FC<LearningPlanItemProps> = ({
  courseName,
  progressNumerator,
  progressDenominator,
}) => {
  return (
    <View style={styles.itemContainer}>
      <Feather name="circle" size={20} color="#888" style={styles.icon} /> 
      <Text style={styles.courseName}>{courseName}</Text>
      <Text style={styles.progressText}>
        {progressNumerator}/{progressDenominator}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  courseName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default LearningPlanItem;
