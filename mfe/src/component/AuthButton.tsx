import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress, loading = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AuthButton;
