import React, { useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {postInfo} from '../api/postInfo.js'
import {addLike} from '../api/addLike.js'
import {delLike} from '../api/delLike.js'
import { useNavigation } from '@react-navigation/native';
import CommentItem from './commentItem.js'

const post = ({route}) =>{
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState("")
  const [data, setData] = useState([])
  const [liked, setLiked] = useState(false)
  const { id } = route.params;
  const navigation = useNavigation();

  function newComment() {
    
  }

  if(isLoading){
    const getToken = async() => {
      try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
          setToken(`${value}`)
          postInfo(id, value).then(dt => {
            setData(dt)
            if (dt.liked){
              setLiked(true)
            }
            setIsLoading(false)
          })
        } else {
          return(null)
        }
      } catch(e) {
        // error reading value
      }
    }
    getToken()
  }

  const OptionButton = props => {
    if(data.isAuthor){
      return(
        <Button
        title="options"
        onPress={ () => {navigation.navigate("optionsPost", {id: id})}}
        />
      )
    } else {
      return(null)
    }
  }

  const AppButton = props => {
    if(liked){
      return(
        <TouchableOpacity
        onPress={() => {
          delLike(token, id).then(data =>{
            if(data.sucess == 0){
            } else {
              postInfo(id, token).then(data => {
                setData(data)
                setLiked(false)
              })
            }
          })
        }}
        >
          <Text style={styles.appButtonText}>{parseInt(data.likes)} ❤</Text>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity
        onPress={() => {
          addLike(token, id).then(data =>{
            if(data.sucess == 0){
            } else {
              postInfo(id, token).then(data => {
                setData(data)
                setLiked(true)
              })
            }
          })
        }}
        >
          <Text style={styles.appButtonText}>{data.likes} ♡</Text>
        </TouchableOpacity>
      )
    }
  }

  if(isLoading){
    return <View style={styles.loading_container}><ActivityIndicator size='large' /></View>
  } else {
    return(
      <View style={styles.main_container}>
        <ScrollView>
        <OptionButton/>
        <Text style={{fontSize: 22}}>{data.title}</Text>
        <AppButton/>
        <Text style={{fontSize: 18, marginBottom: 10}}>{data.text}</Text>
        <Text style={{fontSize: 22}}>Commentaires:</Text>
        <Button title={"Ajoutez un commentaire"}/>
        <FlatList data={data.comments} renderItem={({item}) => <CommentItem username={item.username} message={item.message}/>} />
        </ScrollView>
      </View>
    )
  }
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
    margin: 5,
  },
  appButtonText: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})

export default post