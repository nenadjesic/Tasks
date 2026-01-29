import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


export type RootStackParamList = {
  Home: undefined 
  Tasks: undefined;
  App: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();


import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import App from '../../App';

function AppNavigation() {
  return (
      <Stack.Navigator 
        initialRouteName="App" screenOptions={{ headerShown: true }}> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
  );
}

export default AppNavigation;
