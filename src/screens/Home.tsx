import React from 'react';

import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';


function Home() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       TASKS
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white', 
  },
});

export default Home;