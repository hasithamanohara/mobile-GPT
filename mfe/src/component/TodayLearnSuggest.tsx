import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface LearningPromptCardProps {
  onGetStartedPress: () => void;
}

const LearningPromptCard: React.FC<LearningPromptCardProps> = ({ onGetStartedPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.cardText}>What do you want to learn today</Text>
        <TouchableOpacity style={styles.button} onPress={onGetStartedPress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/SplashScreenImage.png')}
        style={styles.illustration}
        resizeMode="contain"
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
    backgroundColor: '#FF8C00', 
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

export default LearningPromptCard;
