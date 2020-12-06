import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import postList from './postList'
import Post from './post'
import optionsPost from './optionsPost'

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="postList"
                component={postList}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Post" component={Post} options={{title: "Post"}}/>
            <Stack.Screen name="optionsPost" component={optionsPost} options={{title: "Options"}}/>
        </Stack.Navigator>
    );
}