import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import GenericHeader from '../component/GenericHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';

type DeleteCourseScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'EditCourse'>['route'];
type DeleteCourseScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'EditCourse'>['navigation'];

const DeleteCourseScreen: React.FC = () => {
  const navigation = useNavigation<DeleteCourseScreenNavigationProp>();
  const route = useRoute<DeleteCourseScreenRouteProp>();
  const { courseId } = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleDeleteCourse = async () => {
    setIsLoading(true);
    setMessage('');
    setIsSuccess(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dummy: Course deleted successfully!');
      setMessage('Course deleted successfully!');
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Failed to delete course:', error);
      setMessage(`Failed to delete course: ${error.response?.data?.message || error.message}`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader title="Delete Course" showBackButton={true} />
        <View style={styles.content}>
          <Text style={styles.warningText}>
            Are you sure you want to delete this course?
          </Text>
          <Text style={styles.courseIdText}>Course ID: {courseId}</Text>
          <Text style={styles.warningText}>
            This action cannot be undone.
          </Text>

          {message ? (
            <Text style={[styles.messageText, isSuccess ? styles.successText : styles.errorText]}>
              {message}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteCourse}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.deleteButtonText}>Confirm Delete</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  warningText: {
    fontSize: 18,
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  courseIdText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    width: '80%',
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '80%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#333',
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

export default DeleteCourseScreen;
