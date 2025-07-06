import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthInputFieldsProps } from '../types/Types';

const AuthInputFields: React.FC<AuthInputFieldsProps> = ({ email, setEmail, password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Your Email</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Cooper_Kristin@gmail.com"
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
          placeholder="••••••••••"
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
    marginBottom: 8,
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

export default AuthInputFields;
