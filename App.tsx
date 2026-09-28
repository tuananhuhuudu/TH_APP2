import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StudentProvider} from './src/data/StudentContext';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <StudentProvider>
        <RootNavigator />
      </StudentProvider>
    </SafeAreaProvider>
  );
}

export default App;
