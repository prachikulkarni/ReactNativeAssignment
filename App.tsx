/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './src/navigation/type';
import UserList from './src/userList/screen/UserList';
import PhotoList from './src/photoList/screen/PhotoList';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalStrings} from './src/constants/GlobalStrings';
import {Provider} from 'react-redux';
import Store from './src/store/Store';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
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
