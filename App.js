import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './component/login.js'
import Main from './component/main.js'
import Register from './component/register.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: 'Connexion' }}
        />
        <Stack.Screen name="Main" component={Main} options={{title: "Dark JM"}}/>
        <Stack.Screen name="register" component={Register} options={{ title: 'Création du compte' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}