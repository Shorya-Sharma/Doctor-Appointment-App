import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Button from '../Button/Button'
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({onChange}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button onPress={()=> navigation.goBack()} style={styles.backButton}><Text>Back</Text></Button>
      <TextInput style={styles.input} placeholder='Search Doctor..'
       clearButtonMode='always' autoCapitalize='none' autoCorrect={false} onChangeText={onChange}/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flexDirection:'row',
        borderRadius:10,
        margin:10,
        height:48,
        width:'95%',
        alignItems:'center'
    },
    backButton:{
        paddingHorizontal:10
    },
    input:{
        width:'85%'
    }
})