import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, StudentBottomTabParamList } from '../types/Navigation';

import GenericHeader from '../component/GenericHeader';
import { Feather } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';


type AccountScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<StudentBottomTabParamList, 'Account'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { user, logout } = useContext(AuthContext);

  const dummyUser = {
    name: 'Kristin Cooper',
    email: 'cooper.kristin@example.com',
    avatarUri: require('../../assets/avatar.png'),
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    await logout();
    handleNavLogout();
  };

  const handleFavorite = () => {
    console.log('Navigating to Favorite screen');
  };

  const handleEditAccount = () => {
    console.log('Navigating to Edit Account screen');
    navigation.replace('EditAccount');
  };

  const handleSettingsAndPrivacy = () => {
    console.log('Navigating to Settings and Privacy screen');
  };

  const handleHelp = () => {
    console.log('Navigating to Help screen');
  };

  const handleNavLogout = () => {
    navigation.replace('Login');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader title="Account" showBackButton={false} />

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image source={dummyUser.avatarUri} style={styles.profileAvatar} />
              <TouchableOpacity style={styles.cameraIconContainer}>
                <Feather name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{user?.username ?? dummyUser.name}</Text>
            <Text style={styles.profileEmail}>{user?.email ?? dummyUser.email}</Text>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleFavorite}>
              <Text style={styles.menuItemText}>Favourite</Text>
              <Feather name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleEditAccount}>
              <Text style={styles.menuItemText}>Edit Account</Text>
              <Feather name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleSettingsAndPrivacy}>
              <Text style={styles.menuItemText}>Settings and Privacy</Text>
              <Feather name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
              <Text style={styles.menuItemText}>Help</Text>
              <Feather name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={20} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4A4AFF',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A4AFF',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
