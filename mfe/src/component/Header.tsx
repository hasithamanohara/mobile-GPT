import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface AppHeaderProps {
  userName: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ userName }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.hiText}>Hi, {userName}</Text>
        <Text style={styles.subtitleText}>Let's plan today</Text>
      </View>
      <Image
        source={require('../../assets/avatar.png')}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#4A4AFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greetingContainer: {
    flex: 1,
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default AppHeader;
