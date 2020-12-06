import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home'
import Settings from './settings'
import newPost from './newPost'
import { AntDesign } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'setting' : 'setting';
              } else if (route.name === 'newPost'){
                iconName = focused ? 'pluscircleo' : 'pluscircleo';
              }
  
              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
            <Tab.Screen name="Home" component={Home} options={{title: "Accueil"}} />
            <Tab.Screen name="newPost" component={newPost} options={{title: "Nouveau Post"}}/>
            <Tab.Screen name="Settings" component={Settings} options={{title: "Paramètres"}}/>
        </Tab.Navigator>
    );
}