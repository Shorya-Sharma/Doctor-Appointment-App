import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { Calendar } from 'react-native-calendars'
import { COLORS } from '../../styles/color'
import SectionHeader from '../SectionHeader/SectionHeader'
import Chip from '../Chip/Chip'

const timeSlots = Array.from({length:8},(_,i)=>({
    time: `${10 + i}:00 ${10 + i >= 12 ? "PM" : "AM"}`,
    value: `${10 + i}:00`,
}))

const reminderSlot = [
{
    title:'10 min',
    value:'10'
},
{
    title:'15 min',
    value:'15'
},
{
    title:'30 min',
    value:'30'
}
]

const AppointmentSlot = ({onChangeHandler}) => {
  const today = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(14,'day').format('YYYY-MM-DD');

  const [selectedDate,setSelectedDate] = useState(today);
  const [selectedSlot,setSelectedSlot] = useState(0);
  const [selectedRemindTime, setSeelectedRemindTime]= useState(0);  
  

  const onChangeDate = useCallback((day)=>{
    setSelectedDate(day.dateString);
    onChangeHandler && onChangeHandler('date',day.dateString);
  },[onChangeHandler]);

  const onChangeSlot = useCallback((index)=>{
    setSelectedSlot(index);
    onChangeHandler && onChangeHandler('time',timeSlots[index].value);
  },[onChangeHandler]);

  const onChangeReminder = useCallback((index)=>{
    setSeelectedRemindTime(index);
    onChangeHandler && onChangeHandler('reminder',reminderSlot[index].value);
  },[onChangeHandler]);


  return (
    <ScrollView style={styles.container}>
    
      <Calendar minDate={today} maxDate={maxDate}
       onDayPress={onChangeDate}
       markedDates={{
        [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: COLORS.PRIMARY}
      }}
      theme={{
        todayTextColor:'white',
        selectedDayBackgroundColor: COLORS.PRIMARY,
        arrowColor:COLORS.PRIMARY
      }}
      />
      <SectionHeader title={'Available Time Slot'}/>
      <View>
      <FlatList 
        data={timeSlots}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{padding:10}}
        contentContainerStyle={{gap:8}}
        keyExtractor={(item,i)=> i.toString()}
        renderItem={({item,index})=> <Chip onChange={(index)=>onChangeSlot(index)} selected={selectedSlot} name={item.time} description={item.value} key={index} index={index}/>}
      />
      </View>
      <Text style={{padding:10,fontSize:16,fontWeight:'500'}}>{'Reminder Me Before'}</Text>
      <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,padding:10}}>
        {reminderSlot.map((item,i)=> <Chip onChange={(index)=> onChangeReminder(index)} selected={selectedRemindTime} name={item.title} description={item.value} key={i} index={i}/>)}
      </View>
    </ScrollView>
  )
}

export default AppointmentSlot

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})