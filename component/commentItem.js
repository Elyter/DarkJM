import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommentItem = (props) =>{
  return (
        <View style={styles.main_container}>
            <Text style={{fontSize: 20}}>{props.username}: </Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{props.message}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    main_container: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5,
    },
    text: {
      fontSize: 18,
    }
})

export default CommentItem