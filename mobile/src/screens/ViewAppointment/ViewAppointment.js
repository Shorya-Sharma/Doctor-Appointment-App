import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import DoctorCard from '../../components/DoctorList/DoctorCard';
import { metricsDoctor } from '../DoctorDetails/constant';
import Button from '../../components/Button/Button';
import { COLORS } from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import { fetchDoctorById } from '../../api/doctors';
import { fetchAppointments } from '../../api/appointment';

const ViewAppointment = ({route}) => {
  const {appointmentId} = route?.params;
  const {navigate} = useNavigation();

  //const appointment = useSelector((state)=> state.appointment.appointments?.find((appointment)=> appointment.id === appointmentId));
  const {data:appointments} = useQuery({
      queryKey:['appointments'],
      queryFn:fetchAppointments
  
  });

  const appointment = useMemo(()=>{
     return appointments?.find((appointment)=> appointment.id === appointmentId)}
    ,[appointments]);
  const {data,isError,error} = useQuery({
    queryKey:['doctorById',appointment?.doctor],
    queryFn:()=> fetchDoctorById(doctorId)
  });

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Button onPress={()=> navigation.goBack()}><Image source={require('../../assets/img/back.png')}/></Button>
      </View> */}
      <View>
        <DoctorCard {...data} style={{width:'100%'}} imageStyle={{height:280}} displayAll/>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',paddingVertical:10}}>
        {metricsDoctor.map((item,i)=>(
          <View key={i} style={{alignItems:'center'}}>
          <View style={styles.imageContainer}>
            <Image source={item.icon} />
            </View>
            <Text>{item.label}</Text>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <Text style={{fontSize:18, paddingVertical:10,fontWeight:'500'}}>{'About Me'}</Text>
      <Text style={{paddingVertical:5}}>{'Dr. Carly Angel is the top most immunologists specialist in Crist Hospital in London, UK. Read More. . . '}</Text>
      
    </ScrollView>
    <View style={{position:'absolute',bottom:0,width:'100%',padding:10}}>
        <Button onPress={()=> navigate('audioCallScreen',{doctorId:data.id,userId:'test123'})} style={{backgroundColor:COLORS.PRIMARY}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:2}}>
        <Image source={require('../../assets/img/call.png')}/>
        <Text style={{color:'white',fontSize:16}}>{`Voice Call (${appointment?.slot?.time} ${appointment?.slot?.time?.split(':')[0]>=12? 'PM':'AM' })`}</Text>
        </View>
        </Button>
      </View>
    </View>
  )
}

export default ViewAppointment

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:20
    },
    imageContainer:{
      borderRadius:'50%',backgroundColor:'#EDEDFC',height:42,width:42,alignItems:'center',justifyContent:'center',marginBottom:5
    }
})