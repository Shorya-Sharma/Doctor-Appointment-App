import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from './src/screens/Onboarding/Onboarding';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import OtpVerification from './src/screens/OtpVerification/OtpVerification';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import SearchScreen from './src/screens/SearchScreen/SearchScreen';
import DoctorList from './src/components/DoctorList/DoctorList';
import DoctorDetails from './src/screens/DoctorDetails/DoctorDetails';
import BookAppointment from './src/screens/BookAppointment/BookAppointment';
import BottomTabNavigator from './src/components/BottomTabNavigator/BottomTabNavigator';
import ViewAppointment from './src/screens/ViewAppointment/ViewAppointment';
import AudioCall from './src/screens/AudioCall/AudioCall';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='onboarding'>
        <Stack.Screen name='onboarding' component={Onboarding} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='loginScreen' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name='otpVerify' component={OtpVerification} options={{headerTitle:'Verify OTP',headerBackTitle:'Back'}}/>
        <Stack.Screen name='tabNavigator' component={BottomTabNavigator} options={{headerShown:false}} />
        <Stack.Screen name='searchScreen' component={SearchScreen} options={{headerShown:false}} />
        <Stack.Screen name='doctorsList' component={DoctorList} options={{headerShown:false}}/>
        <Stack.Screen name='doctorDetails' component={DoctorDetails} options={{headerTitle:'',headerBackTitle:'Back'}}/>
        <Stack.Screen name='bookAppointment' component={BookAppointment} options={{headerTitle:'Appointment',headerBackTitle:'Back'}}/>
        <Stack.Screen name='appointmentScreen' component={ViewAppointment} options={{headerTitle:'My Appointment',headerBackTitle:'Back'}}/>
        <Stack.Screen name='audioCallScreen' component={AudioCall} options={{headerTitle:'',headerBackTitle:'Back'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})