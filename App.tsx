/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {StyleSheet, useColorScheme} from 'react-native';
import {RootStackParamList} from './navigation/type';
import UserList from './userList/screen/UserList';
import PhotoList from './photoList/screen/PhotoList';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={UserList} name="UserListScreen"></Stack.Screen>
        <Stack.Screen
          component={PhotoList}
          name="PhotoListScreen"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
