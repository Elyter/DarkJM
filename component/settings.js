import React from 'react';
import { View, Button } from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


const options = ({navigation}) =>{
    var _deleteToken = async () => {
      try {
          await AsyncStorage.removeItem("token");
      } catch(exception) {
  
      }
  }
    return(
      <View>
        <Button 
        title="Se déconnecter"
        onPress={() => {
          _deleteToken()
          navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
          });
        }}
        />
      </View>
    )
  }

  export default options