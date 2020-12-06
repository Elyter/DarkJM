import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { getPosts } from '../api/getPosts.js'
import PostItem from './postItem.js'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 

const postList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const navigation = useNavigation();

  if(isLoading){
    getPosts().then(data => {
      setData(data)
      setIsLoading(false)
    })
    return <View style={styles.loading_container}><ActivityIndicator size='large' /></View>
  }

  if(!isLoading){
    return (
      <ScrollView style={styles.main_container}>
        <View style={styles.buttons}>
          <AntDesign.Button
            name="reload1"
            onPress={() => setIsLoading(true)}
          >Actualiser</AntDesign.Button>
        </View>
        <FlatList data={data} renderItem={({item}) => <PostItem likes={item.likes} title={item.title} id={item.id}/>} />
      </ScrollView>
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
  buttons: {
    flexDirection: 'row',
    marginLeft: "auto",
    marginRight: "auto"
  },
  main_container: {
    margin: 5
  }
})

export default postList;