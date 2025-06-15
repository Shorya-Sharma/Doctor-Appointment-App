import { BackHandler, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import DoctorCard from '../../components/DoctorList/DoctorCard';
import { COLORS } from '../../styles/color';
import Button from '../../components/Button/Button';
import AppointmentSlot from '../../components/AppointmentSlot/AppointmentSlot';
import { useFocusEffect, usePreventRemove } from '@react-navigation/native';
import ConfirmationModal from '../../components/ConfirmationalModal/ConfirmationModal';
import { createAppointment } from '../../api/appointment';
import { useDispatch } from 'react-redux';
import { setAppointment } from '../../store/features/appointment';

const BookAppointment = ({route,navigation}) => {
  const {doctorId} = route?.params;
  const [appointmentDetails,setAppointmentDetails] = useState({
    patient:{
        name:'',
        phoneNumber:'',
        age:''
    },
    slot:{
       'date':'',
       'time':'',
       'reminder':'' 
    },
    user:'67c75c5d163a30459b6f297c', // replace this with logged in user
    doctor: doctorId,
    status: 'PENDING',
  });
  const [formError,setFormError] = useState('');
  const [isPatientDetail,setIsPatientDetail] = useState(false);
  const [displayModal,setDisplayModal] = useState(false);
  const {data,isError,error} = useQuery({
    queryKey:['doctorById',doctorId],
    queryFn:()=> fetchDoctorById(doctorId)
  });

  const dispatch = useDispatch();


  const mutation = useMutation({
    mutationFn:createAppointment,
    onSuccess:(data)=>{
      console.log("Recived ",data);
      dispatch(setAppointment(data));
      setDisplayModal(true);
    },
    onError:(err)=>{
      console.log(err);
    }
  })

  usePreventRemove(isPatientDetail,({data})=>{
    if(isPatientDetail){
        setIsPatientDetail(false);
    }
    else{
        navigation.dispatch(data.action);
    }
  })

  const onPressNext = useCallback(()=>{
    setFormError(false);
    console.log(appointmentDetails);
    if(isPatientDetail){
        mutation.mutate(appointmentDetails);
    }
    else{
        if(appointmentDetails.patient?.name &&
            appointmentDetails.patient?.age?.length && appointmentDetails.patient?.phoneNumber?.length === 10){
            setIsPatientDetail(true); 
       }
       else{
           setFormError('Please fill the above fields.')
       }
    }
    

  },[appointmentDetails,isPatientDetail]);

  const onChangeTextField = useCallback((name,value)=>{
    if(formError){
        setFormError(false);
    }
    setAppointmentDetails((prevState)=>({
        ...prevState,
        patient:{
            ...prevState.patient,
            [name]:value
        }
    }));
    
  },[formError]);

  const onChangeHandler = useCallback((name,value)=>{
    setAppointmentDetails((prevState)=>({
        ...prevState,
        slot:{
            ...prevState.slot,
            [name]:value
        }
    }));
    
  },[]);

  return (
    <View style={styles.container}>
    {!isPatientDetail && <View style={{padding:10}}>
      <Text style={styles.doctorHeading}>Doctor</Text>
      <DoctorCard {...data} style={styles.doctorCard} imageStyle={styles.doctorImage}
       contentContainerStyle={styles.contentContainerStyle}/>
       <View>
       <Text style={[styles.doctorHeading,{marginTop:10}]}>Appointment For</Text>
       <TextInput value={appointmentDetails.patient.name} onChangeText={(text)=> onChangeTextField('name',text)} style={styles.input} placeholder='Patient Name'/> 
       <TextInput value={appointmentDetails.patient.phoneNumber} onChangeText={(text)=> onChangeTextField('phoneNumber',text)} style={styles.input} placeholder='Contact Number' keyboardType='numeric' maxLength={10}/> 
       <TextInput value={appointmentDetails.patient.age} onChangeText={(text)=> onChangeTextField('age',text)} style={styles.input} placeholder='Age' keyboardType='numeric' maxLength={2}/> 
       </View>
       
      </View>}
      {isPatientDetail && <AppointmentSlot onChangeHandler={onChangeHandler}/>}
      <View style={{position:'absolute',bottom:0,width:'100%',padding:10}}>
       {formError && <Text style={styles.errorText}>{formError}</Text>}
        <Button onPress={onPressNext} label={isPatientDetail?'Set Appointment':'Next'} style={{backgroundColor:COLORS.PRIMARY}}/>
      </View>
      <ConfirmationModal modalText={`You booked an appointment with ${data.name} on ${appointmentDetails?.slot?.date}, at ${appointmentDetails?.slot?.time}.`} onClose={()=> setDisplayModal(false)} visible={displayModal}/>
    </View>
  )
}

export default BookAppointment

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        
    },
    doctorHeading:{
        fontSize:16,
        fontWeight:'500'
    },
    doctorCard:{
        flexDirection:'row',
        paddingVertical:10,
        justifyContent:'space-between',
        borderRadius:10,
        borderWidth:1,
        width:'100%',
        flex:0,
        paddingHorizontal:10,
        alignContent:'center',
        alignItems:'center',
        borderColor:'#EDEDFC',
        marginTop:10

    },
    doctorImage:{
        width:80,
        height:80,
        borderRadius:10,
        marginRight:10
    },
    contentContainerStyle:{
        flexDirection:'column',
        justifyContent:'flex-start',
        width:'100%',
        gap:8
    },
    input:{
        height:48,
        borderWidth:1,
        borderColor:'#76809F',
        borderRadius:5,
        marginVertical:10,
        padding:10
    },
    errorText:{
        marginBottom:20,
        color:'red'
    }
})