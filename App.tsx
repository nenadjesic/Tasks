import 'react-native-gesture-handler'; // Prva linija!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white', 
  },
});

export default App;
