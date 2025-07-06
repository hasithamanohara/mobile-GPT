import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import GenericHeader from '../component/GenericHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';

type CreateCourseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateCourse'>;

const CreateCourseScreen: React.FC = () => {
  const navigation = useNavigation<CreateCourseScreenNavigationProp>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleCreateCourse = async () => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      setMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');
    setIsSuccess(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dummy: Course created successfully!');
      setMessage('Course created successfully!');
      setIsSuccess(true);
      setTitle('');
      setDescription('');
      setContent('');
    } catch (error: any) {
      console.error('Failed to create course:', error);
      setMessage(`Failed to create course: ${error.response?.data?.message || error.message}`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader title="Create New Course" showBackButton={true} />
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.instructionText}>Enter details for your new course:</Text>

          <TextInput
            style={styles.input}
            placeholder="Course Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Course Description"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Course Content (e.g., Lesson 1: Intro...)"
            placeholderTextColor="#888"
            multiline
            numberOfLines={8}
            value={content}
            onChangeText={setContent}
          />

          {message ? (
            <Text style={[styles.messageText, isSuccess ? styles.successText : styles.errorText]}>
              {message}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateCourse}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Course</Text>
            )}
          </TouchableOpacity>
          <View style={{ height: 40 }} />
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
    padding: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    backgroundColor: '#4A4AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
  },
  errorText: {
    color: 'red',
  },
});

export default CreateCourseScreen;
