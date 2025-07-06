import React, {useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types/Types';

interface GenericHeaderProps {
  title: string;
  showBackButton?: boolean;
}

type GenericHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GenericHeader: React.FC<GenericHeaderProps> = ({ title, showBackButton = true }) => {
  const navigation = useNavigation<GenericHeaderNavigationProp>();
  const { user } = useContext(AuthContext);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      if (!user) {
        Alert.alert("Something Wrong, Please Restart");
      } else {
        navigateBasedOnRole(user);
      }
    }
  };

  const navigateBasedOnRole = (user: User) => {
    if (user.role === 'instructor') {
      navigation.replace('InstructorMain', { screen: "InstructorHome" });
    } else if (user.role === 'student') {
      navigation.replace('StudentMain', { screen: 'Home' });
    } else {
      console.log("cannot go back");
    }
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightSpacer} />
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
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  rightSpacer: {
    width: 34,
  },
});

export default GenericHeader;
