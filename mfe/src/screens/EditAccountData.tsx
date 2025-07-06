import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, KeyboardAvoidingView,
  Platform, Alert
} from 'react-native';
import GenericHeader from '../component/GenericHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types/Types';

type EditAccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditAccount'>;

const EditAccountScreen: React.FC = () => {
  const navigation = useNavigation<EditAccountScreenNavigationProp>();
  const { updateUser, user } = useContext(AuthContext);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "" });

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const validateInputs = () => {
    const newErrors = { username: "", email: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdateUser = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const updateData: Partial<User> = {};

      if (username !== user?.username) updateData.username = username;
      if (email !== user?.email) updateData.email = email;

      if (Object.keys(updateData).length > 0) {
        await updateUser(updateData);
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("No Changes", "You haven't made any changes to update.");
      }
    } catch (error) {
      Alert.alert("Update Failed", "Could not update your profile. Please try again.");
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader
          title="Edit Profile"
          showBackButton={true}
        />
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.instructionText}>Update your personal information:</Text>

            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="Enter new username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter new email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.disabledButton]}
              onPress={handleUpdateUser}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Update Profile</Text>
              )}
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
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
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingTop: 10,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4A4AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditAccountScreen;