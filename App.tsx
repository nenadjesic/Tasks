import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#1A1A1A',
    card: '#FFFFFF',
    border: '#f9f9f9',
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    border: '#2C2C2C',
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        
        <View style={styles.navWrapper}>
          <NavigationContainer theme={theme}>
            <AppNavigation />
          </NavigationContainer>
        </View>

        <TouchableOpacity 
          onPress={toggleTheme} 
          style={[styles.toggleBtn, { backgroundColor: isDarkMode ? '#333' : '#eee' }]}
        >
          <Text style={{ color: theme.colors.text }}>
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </Text>   
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navWrapper: {
    flex: 1,
  },
  toggleBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 9999,
    padding: 10,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});
