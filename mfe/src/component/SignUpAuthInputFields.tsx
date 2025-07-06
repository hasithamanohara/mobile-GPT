import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SignUpAuthInputFieldsProps } from '../types/Types';

const SignUpAuthInputFields: React.FC<SignUpAuthInputFieldsProps> = ({
  username = '',
  setUsername = () => {},
  email = '',
  setEmail = () => {},
  password = '',
  setPassword = () => {},
  showUsername = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      {showUsername && (
        <>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A0A0A0"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </>
      )}

      <Text style={styles.inputLabel}>Email</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordToggle}
        >
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  passwordToggle: {
    padding: 10,
  },
});

export default SignUpAuthInputFields;