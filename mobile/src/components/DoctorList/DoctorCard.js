import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchSpecialities } from '../../api/specialities';
const cardGap = 16;
const cardWidth = (Dimensions.get('window').width - cardGap * 3)/2;
const DoctorCard = ({id,name,image,speciality,horizontal,style,imageStyle,displayAll,contentContainerStyle, ...props}) => {
  
  const {navigate} = useNavigation();
  const {data} = useQuery({
    queryKey:['specialities'],
    queryFn:fetchSpecialities
  });

  const specialityObj = useMemo(()=>{
    return data?.find((item)=> item?.id === speciality);
  },[speciality,data]);

  return (
    <TouchableOpacity onPress={()=> navigate("doctorDetails",{doctorId:id})} style={[styles.container,style]}>
      <Image source={{uri:image}} style={[styles.image,!horizontal?{height:220}:{},imageStyle]}/>
      <View style={[{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',padding:5},contentContainerStyle]}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:displayAll?8:2}}>
            <Image source={require('../../assets/img/star.png')} />
            <Text>{props.rating}</Text>
        </View>
        <View style={{flexDirection:'row',paddingVertical:5}}>
        {displayAll && <Text style={{paddingRight:10}}>{specialityObj?.title}</Text>}
        {!displayAll && <Text>Fee ₹{props?.fee}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DoctorCard

const styles = StyleSheet.create({
    container:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        width:cardWidth,
    },
    image:{
        height:140,
        width:'100%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    nameText:{
        fontSize:16,
        fontWeight:'400',
        width:'70%'
    }
})