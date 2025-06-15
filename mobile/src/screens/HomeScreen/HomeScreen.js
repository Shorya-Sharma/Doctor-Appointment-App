import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Header from '../../components/Header/Header'
import Categories from '../../components/Categories/Categories'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import DoctorList from '../../components/DoctorList/DoctorList'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { COLORS } from '../../styles/color'
import { useQuery } from '@tanstack/react-query'
import { fetchSpecialities } from '../../api/specialities'
import dayjs from 'dayjs'
import Button from '../../components/Button/Button'
import { useAppContext } from '../../context/AppProvider'
import { fetchAppointments } from '../../api/appointment'
import { fetchDoctorById } from '../../api/doctors'

const HomeScreen = ({route}) => {
  const {navigate} = useNavigation();
  //const appointments = useSelector((state)=> state.appointment.appointments);

  const {data:appointments} = useQuery({
    queryKey:['appointments'],
    queryFn:fetchAppointments

  });
  const {values:{isDoctor}} = useAppContext();
  console.log("Doctor ",isDoctor);
  const {data,isError,error} = useQuery({
    queryKey:['doctorById',appointments?.[0]?.doctor],
    queryFn:()=> fetchDoctorById(appointments?.[0]?.doctor)
  });

  const {data:specialityData} = useQuery({
      queryKey:['specialities'],
      queryFn:fetchSpecialities
    });
  
    const specialityObj = useMemo(()=>{
      return specialityData?.find((item)=> item?.id === data?.speciality) ?? {};
    },[specialityData,data]);

  return (
    <ScrollView style={{flex:1,backgroundColor:'white'}}>
    
      <Header />
      {!isDoctor && <View>
      <Categories />
      {appointments?.length>0 && <View>
        <SectionHeader title={'Appointments'} onPress={()=> navigate('tabNavigator',{screen:'viewAllAppointments'})}/>
        <TouchableOpacity onPress={()=> navigate('appointmentScreen',{appointmentId:appointments[0]?.id})} style={styles.cardContainer}>
          <View style={{flexDirection:'row'}}>
          <Image source={{uri:data?.image}} style={styles.doctorImage}/>
            <View style={{paddingHorizontal:10}}>
              <Text style={styles.cardText}>{data?.name}</Text>
              <Text style={styles.cardText}>{specialityObj?.title}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,paddingVertical:10}}>
            <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                <Image source={require('../../assets/img/calendar.png')}/>
                <Text style={{color:'white',paddingHorizontal:5}}>{dayjs(appointments[0]?.slot?.date).format("DD MMM")}</Text>
            </View>
            <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                <Image source={require('../../assets/img/clock.png')}/>
                <Text style={{color:'white',paddingHorizontal:5}}>{appointments[0]?.slot?.time?.split(":")[0]>12 ? appointments[0]?.slot?.time + ' PM' : appointments[0]?.slot?.time + ' AM'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>}
      <SectionHeader title={'Top Doctors'} onPress={()=> navigate('doctorsList')}/>
      <DoctorList horizontal/>
      </View>}
      {isDoctor && <View style={{width:'100%',paddingVertical:15,paddingHorizontal:10}}>
                    <Button onPress={()=> navigate('audioCallScreen',{doctorId:'67c766d1b266427361e4ac80',userId:'test123',isDoctor:true})} label={'Connect With Patient'} style={{backgroundColor:'#0B3DA9'}}/>
                    </View>}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  cardContainer:{backgroundColor:COLORS.PRIMARY,
     height:140,
    marginHorizontal:10,
    borderRadius:10,
    padding:15,
  },
  doctorImage:{
    height:72,
    width:72,
    borderRadius:10
  },
  cardText:{
    color:'white',
    fontSize:16,
    paddingVertical:5
  }
})