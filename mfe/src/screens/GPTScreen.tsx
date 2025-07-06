import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';

import GenericHeader from '../component/GenericHeader';;

const GPTScreen: React.FC = () => {

  const [inputText, setInputText] = useState<string>('');
  const [responseText, setResponseText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendToGemini = async () => {
    if (!inputText.trim()) {
      setResponseText("Please enter something to get suggestions.");
      return;
    }

    setIsLoading(true);
    setResponseText('');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const simulatedResponse = `Based on your interest in "${inputText.trim()}", here are some suggestions:

1.  **Online Courses:** Look for courses on platforms like Coursera, Udemy, or edX. Search for "Software Engineering Fundamentals," "Data Structures and Algorithms," or specific programming languages like Python, Java, or JavaScript.
2.  **Bootcamps:** Consider intensive coding bootcamps for a fast-paced learning environment and career transition support.
3.  **Books:** Read foundational books like "Clean Code" by Robert C. Martin or "Cracking the Coding Interview" by Gayle Laakmann McDowell.
4.  **Practice:** Solve coding challenges on LeetCode, HackerRank, or CodeWars.
5.  **Projects:** Start building small personal projects to apply your knowledge and build a portfolio.
6.  **Community:** Join online forums, local meetups, or developer communities to network and learn from others.

Remember to focus on fundamentals and build a strong portfolio!`;

    setResponseText(simulatedResponse);
    setIsLoading(false);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GenericHeader title="Get Suggetions" showBackButton={false} />

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.instructionText}>
              Tell me what you want to learn or achieve, and I'll give you suggestions!
            </Text>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A4AFF" />
                <Text style={styles.loadingText}>Getting suggestions...</Text>
              </View>
            ) : (
              responseText ? (
                <View style={styles.responseCard}>
                  <Text style={styles.responseText}>{responseText}</Text>
                </View>
              ) : null
            )}

            <View style={{ height: 20 }} />
          </ScrollView>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., I want to be a software engineer, what should I do?"
              placeholderTextColor="#888"
              multiline
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendToGemini}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.sendButtonText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#fffacd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A4AFF',
  },
  responseCard: {
    backgroundColor: '#E0E0FF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 100,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4A4AFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GPTScreen;
