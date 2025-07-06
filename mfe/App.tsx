import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/Routes';
import { AuthProvider } from './src/context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
