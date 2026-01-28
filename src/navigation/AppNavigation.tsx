import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


export type RootStackParamList = {
  Home: undefined 
  Tasks: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();


import Home from '../screens/Home';
import Tasks from '../screens/Tasks';

function AppNavigation() {
  return (
      <Stack.Navigator 
        initialRouteName="Tasks" screenOptions={{ headerShown: true }}> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tasks" component={Tasks} />
      </Stack.Navigator>
  );
}

export default AppNavigation;
