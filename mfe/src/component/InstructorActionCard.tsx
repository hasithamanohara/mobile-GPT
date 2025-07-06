import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface InstructorActionCardProps {
  onCreateCoursePress: () => void;
}

const InstructorActionCard: React.FC<InstructorActionCardProps> = ({ onCreateCoursePress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.cardText}>Ready to create your next great course?</Text>
        <TouchableOpacity style={styles.button} onPress={onCreateCoursePress}>
          <Text style={styles.buttonText}>Create New Course</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/splash-icon.png')}
        style={styles.illustration}
        resizeMode="contain"
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#E0E0FF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  illustration: {
    width: width * 0.35,
    height: width * 0.35,
  },
});

export default InstructorActionCard;
