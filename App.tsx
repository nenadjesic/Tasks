import * as React from 'react';
import { View, Text, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/screens/Home';
import Tasks from './src/screens/Tasks';

 
function AppScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="App" component={AppScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Tasks" component={Tasks} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}