import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDoctors } from '../../api/doctors'
import DoctorCard from './DoctorCard'
import Button from '../Button/Button'
import { useNavigation } from '@react-navigation/native'

const DoctorList = ({horizontal}) => {
    const navigation = useNavigation();
    const {data,isLoading,error} = useQuery({
        queryKey:['doctors'],
        queryFn:fetchDoctors
    });

console.log("error ",error);
    
  return (
    <View style={styles.container}>
    {!horizontal && <View style={styles.header}>
        <Button onPress={()=> navigation.goBack()}><Image source={require('../../assets/img/back.png')}/></Button>
    </View>}
        <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        numColumns={!horizontal && 2}
        columnWrapperStyle={!horizontal && {justifyContent:'space-between',flex:1,gap:16}}
        contentContainerStyle={{gap:16}}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <DoctorCard horizontal={horizontal} key={item.id} {...item}/>}
        />
    </View>
  )
}

export default DoctorList

const styles = StyleSheet.create({
    container:{
        padding:8,
        flex:1,
        backgroundColor:'white'
    },
    header:{flexDirection:'row',backgroundColor:'white',height:60,paddingHorizontal:5}
})