import React from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { delPost } from '../api/delPost.js'

const optionsPost = ({route}) =>{
    const { id } = route.params;
    const navigation = useNavigation();
    return(
        <View>
        <Button 
        title="Supprimer le post"
        onPress={() => {
            const getToken = async() => {
                try {
                  const value = await AsyncStorage.getItem('token')
                  if(value !== null) {
                     delPost(value, id).then(data => {
                       if(data.sucess == 1){
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'postList' }],
                        });
                       } else {
                          alert("error")
                       }
                     })
                  } else {
                    alert("error: no token")
                  }
                } catch(e) {
                  // error reading value
                }
              }
            getToken()
        }}
        />
        </View>
    )
}

export default optionsPost