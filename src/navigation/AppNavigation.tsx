import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from '../screens/Tasks';
import App from '../../App';



export type RootStackParamList = {
  Tasks: undefined;
  App: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
      <Stack.Navigator initialRouteName="Tasks" screenOptions={{ headerShown: true }}> 
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
  );
}

export default AppNavigation;
