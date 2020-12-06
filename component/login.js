import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { loginReq } from '../api/loginReq.js'
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    if(isLoading) {
        return <View style={styles.loading_container}><ActivityIndicator size='large' /></View>
    }
    
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
      }
    } catch(e) {
      // error reading value
    }
  }
  getToken()

  return (
    <View style={styles.main_container}>
      <Text style={{fontSize: 17}}>Pseudo:</Text>
      <TextInput
        textContentType={"name"}
        autoCorrect={false}
        autoCompleteType={"name"}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Text style={{fontSize: 17}}>Mot de passe:</Text>
      <TextInput
        textContentType={"password"}
        secureTextEntry={true}
        autoCorrect={false}
        autoCompleteType={"password"}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            setIsLoading(true)
              loginReq(username, password).then(data => {
                if(data.sucess == 0){
                    setError("Erreur: vos identifiants ne fonctionnent pas.")
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
                  setIsLoading(false)
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                  });
                }
              })
          }}
          title="Se connecter"
        />
        <Text>{error}</Text>
        <Button
          onPress={() => {
            navigation.navigate("register")
          }}
          title="Créer un compte ?"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    main_container: {
      flex:1,
      textAlign:'center',
      margin: 10
    },
    buttons: {
      marginTop: 30,
      flexDirection:'row',
      justifyContent:'space-evenly'
    }
  })
  

export default Login