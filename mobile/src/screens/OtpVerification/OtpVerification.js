import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { OtpInput } from 'react-native-otp-entry'
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppContext } from '../../context/AppProvider';

const OtpVerification = ({route}) => {

    const {mobileNumber} = route?.params;
    const [counter,setCounter] = useState(30);
    const {navigate} = useNavigation();
    const {values,setValues} = useAppContext();

    const countDown = useCallback(()=>{
        if(counter>0){
            setCounter(counter=>counter-1);
        }
    },[])

    useEffect(()=>{
        const timer = setInterval(countDown,1000);
        return ()=> clearInterval(timer);
    },[]);

    const onChangeText= useCallback((text)=>{

    },[]);

    const onOTPFilled= useCallback((text)=>{
        console.log("Recived ",text);
        navigate("tabNavigator");
        // dispatch temporary set doctor true
        setValues({
            ...values,
            isDoctor:true
        })
    },[]);

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18}}>{"We've sent a verification code to"}</Text>
            <Text style={{fontSize:18,fontWeight:18}}>+91-{mobileNumber}</Text>
        </View>
        <View style={{margin:20}}>
            <OtpInput numberOfDigits={6} onTextChange={onChangeText} onFilled={onOTPFilled}/>
        </View>

        {counter >0 && <Text style={{alignSelf:'center',marginTop:20}}>Resend OTP in {counter}s</Text>}
        {counter <= 0 && <Button style={{}}><Text style={{fontSize:18,color:'#0B3DA9'}}>{'Resend'}</Text></Button>}
    </View>
  )
}
export default OtpVerification

const styles = StyleSheet.create({})