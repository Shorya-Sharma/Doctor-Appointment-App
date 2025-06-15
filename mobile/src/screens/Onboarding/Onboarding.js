import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '../../components/Button/Button'
import { useNavigation } from '@react-navigation/native'

const Onboarding = () => {
  const {navigate} = useNavigation();

  useEffect(()=>{
        StatusBar.setHidden(true);
    },[]);

  return (
    <View style={{flex:1}}>
      <ImageBackground source={require('../../assets/img/splash.png')} style={{flex:1,justifyContent:'center'}}>
            <View style={{flex:0.6,justifyContent:'center',marginTop:120,alignItems:'center'}}>
                <Image source={require('../../assets/img/doctor.png')} style={{width:'100%'}} resizeMode='contain'/>
            </View>
            <View style={{flex:0.45, backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:24,fontWeight:'bold',paddingVertical:10}}>Welcome to Medikart</Text>
                    <Text style={{fontSize:18,paddingVertical:10,alignSelf:'center',paddingHorizontal:10,textAlign:'center',color:'gray'}}>{'Book appointments with your favourite doctors'}</Text>
                </View>
                
            </View>
            <View style={{bottom:0,position:'absolute',width:'100%',paddingVertical:15,paddingHorizontal:10}}>
            <Button label={'Get started'} onPress={()=> navigate('loginScreen')} style={{backgroundColor:'#0B3DA9'}}/>
            </View>
      </ImageBackground>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({})