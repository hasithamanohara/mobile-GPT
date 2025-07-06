import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MeetupCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>Meetup</Text>
        <Text style={styles.cardSubtitle}>Off-line exchange of learning experie</Text>
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
    backgroundColor: '#6A5ACD', 
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
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#E0E0FF', 
  },
  illustration: {
    width: width * 0.3, 
    height: width * 0.3,
  },
});

export default MeetupCard;
