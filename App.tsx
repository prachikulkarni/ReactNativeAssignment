/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {useColorScheme} from 'react-native';
import {RootStackParamList} from './navigation/type';
import UserList from './userList/screen/UserList';
import PhotoList from './photoList/screen/PhotoList';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalStrings} from './constants/GlobalStrings';
import { Provider } from 'react-redux';
import Store from './store/Store';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={UserList}
          name="UserListScreen"
          options={{
            title: GlobalStrings.userList,
          }}></Stack.Screen>
        <Stack.Screen
          component={PhotoList}
          name="PhotoListScreen"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
