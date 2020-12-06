import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostItem = (props) =>{
    const navigation = useNavigation();
  return (
      <TouchableOpacity onPress={() => navigation.navigate("Post", {id: props.id})}>
          <View style={styles.main_container}>
              <Text style={{fontSize: 25}}>{props.likes}</Text>
              <Text style={{fontSize: 25, marginRight: 10}}>❤</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{props.title}</Text>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    main_container: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5
    },
    text: {
        fontSize: 22,
    }
})

export default PostItem