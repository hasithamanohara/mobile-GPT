import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CourseCardProps {
  courseName: string;
  instructorName: string;
  description: string;
  durationHours: number;
  imageUri?: string;
  onPress?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  courseName,
  instructorName,
  description,
  durationHours,
  imageUri,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imagePlaceholder}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.courseImage} resizeMode="cover" />
        ) : (
          <Text style={styles.imageFallbackText}>Course Image</Text>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.courseName}>{courseName}</Text>
        <View style={styles.instructorContainer}>
          <Feather name="user" size={14} color="#888" style={styles.instructorIcon} />
          <Text style={styles.instructorName}>{instructorName}</Text>
        </View>
        <View style={styles.instructorContainer}>
          <Feather name="list" size={14} color="#888" style={styles.instructorIcon} />
          <Text style={styles.instructorName}>{instructorName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: '#E0E0E0', 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden', 
  },
  courseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10, 
  },
  imageFallbackText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  detailsContainer: {
    flex: 1, 
    justifyContent: 'space-between',
  },
  courseName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructorIcon: {
    marginRight: 5,
  },
  instructorName: {
    fontSize: 13,
    color: '#888',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  priceText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationTag: {
    backgroundColor: '#FFDDC1', 
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  durationText: {
    fontSize: 14,
    color: '#FF8C00', 
    fontWeight: '600',
  },
});

export default CourseCard;
