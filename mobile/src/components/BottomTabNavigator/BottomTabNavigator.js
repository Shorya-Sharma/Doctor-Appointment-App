import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import Appointments from '../../screens/Appointments/Appointments';
import Settings from '../../screens/Settings/Settings';
import Profile from '../../screens/Profile/Profile';

const FilledHome = require(`../../assets/img/home-filled.png`);
const HomeEmpty = require(`../../assets/img/home-empty.png`);
const AppointmentEmpty = require('../../assets/img/appointment-empty.png');
const AppointmentFilled = require('../../assets/img/appointment-filled.png');
const SettingsEmpty = require('../../assets/img/settings.png');
const SettingsFilled = require('../../assets/img/setting-filled.png');
const ProfileEmpty = require('../../assets/img/ProfileEmpty.png');
const ProfileFilled = require('../../assets/img/ProfileFilled.png');

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="homeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'homeScreen') {
            return (
              <Image
                style={{height: 32, width: 32}}
                source={focused ? FilledHome : HomeEmpty}
              />
            );
          }
          else if(route.name === 'viewAllAppointments'){
            return (
              <Image
                style={{height: 32, width: 32}}
                source={focused ? AppointmentFilled : AppointmentEmpty}
              />
            );
          }
          else if(route.name === 'settingScreen'){
            return (
              <Image
                style={{height: 32, width: 32}}
                source={focused ? SettingsFilled : SettingsEmpty}
              />
            );
          }
          else if(route.name === 'userScreen'){
            return (
              <Image
                style={{height: 32, width: 32}}
                source={focused ? ProfileFilled : ProfileEmpty}
              />
            );
          }
        },
        tabBarLabel:()=>{
            return null;
        },
        headerStyle: {
          backgroundColor: '#0B3DA9',
          
        },
        headerTintColor: 'white',
        headerTitleStyle: {},
        headerBackTitleVisible: false,
        tabBarStyle:{
            alignItems:'center',
            justifyContent:'center'
        },
        tabBarIconStyle:{
            marginTop:5
        }
      })}>
      <Tab.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name='viewAllAppointments' component={Appointments} options={{headerShown: false}}/>
      <Tab.Screen name='settingScreen' component={Settings} options={{headerShown: false}}/>
      <Tab.Screen name='userScreen' component={Profile} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
