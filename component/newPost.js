import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { newPostReq } from '../api/newPost.js'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const newPost = ({}) =>{
    const [textValue, setTextValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const navigation = useNavigation();
    return(
        <View>
            <TextInput
                placeholder="Titre"
                onChangeText={text => setTitleValue(text)}
                value={titleValue}
            />
            <TextInput
                multiline
                numberOfLines={15}
                placeholder="Text"
                onChangeText={text => setTextValue(text)}
                value={textValue}
            />
            <Button 
            title={"Poster"}
            onPress={async () => {
                try {
                    const value = await AsyncStorage.getItem('token')
                    console.log(value)
                    if(value != null){
                        newPostReq(value, titleValue, textValue).then(data => {
                            console.log(data)
                            if(data.sucess == 1){
                                alert("Posté !")
                                navigation.goBack
                            }
                        })            
                    }
                } catch(e) {
                    // error reading value
                }
            }}
            />
        </View>
    )
}

export default newPost