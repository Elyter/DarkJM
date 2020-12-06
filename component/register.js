import React, {useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import {registerReq} from '../api/registerReq.js'
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const Register = () =>{
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();

  if(isLoading) {
    return <View style={styles.loading_container}><ActivityIndicator size='large' /></View>
}

  return (
    <View style={styles.main_container}>
      <Text style={{fontSize: 17}}>Pseudo:</Text>
      <TextInput
        textContentType={"username"}
        autoCorrect={false}
        autoCompleteType={"username"}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => {setUsername(text)
        setError("")
        }}
        value={username}
      />
      <Text style={{fontSize: 17, marginTop: 25}}>Mot de passe:</Text>
      <TextInput
        textContentType={"password"}
        secureTextEntry={true}
        autoCorrect={false}
        autoCompleteType={"password"}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text =>{
          setPassword(text)
          if(password2 != text){
            setError("Vos mots de passe sont différents")
          } else {
            setError("")
          }
        }}
        value={password}
      />
      <Text style={{fontSize : 17, marginTop: 25}}>Réécrivez le mot de passe:</Text>
      <TextInput
        textContentType={"password"}
        secureTextEntry={true}
        autoCorrect={false}
        autoCompleteType={"password"}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => {
          setPassword2(text)
          if(password != text){
            setError("Vos mots de passe sont différents")
          } else {
            setError("")
          }
        }}
        value={password2}
      />
      <View style={{marginTop: 25, flexDirection:'row', justifyContent:'space-evenly'}}>
        <Button
        title="Créer le compte"
        onPress={() =>{
          if(error === ""){
            setIsLoading(true)
            registerReq(username, password).then(data => {
              if(data.sucess == 0){
                  setError("Une erreur c'est produite. détails: " + data.error)
                  setIsLoading(false)
              } else {
                var _storeToken = async () => {
                  try {
                    await AsyncStorage.setItem(
                      'token',
                      `${data.token}`
                    );
                  } catch (error) {
                    setError(error)
                  }
                };
                _storeToken()
                navigation.replace("login")
              }
          })
          }
        }}
        />
      </View>
      <Text>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    textAlign:'center',
    marginRight: 10,
    marginLeft: 10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Register