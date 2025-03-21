import { styles } from "./styles/styles.js";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  removeScheduledNotification,
  schedulePushNotification,
  deletePushNotification
} from "../functions/pushNotifications.js";

import { resetCurrentDay, saveDayInStorage } from "../functions/storage.js";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";



export const Edit = ({ today, currentDay, setCurrentDay, setIsEditing }) => {
  //today is a DATE object, i.e. todays date
  //current day is just the day OBJECT being edited passed into the component

  const [tempText, setTempText] = useState(
    currentDay.text ? currentDay.text : ""
  );
  const [tempNotificationText, setTempNotificationText] = useState(
    currentDay.notificationText ? currentDay.notificationText : ""
  );

  const [notificationTime,setNotificationTime]=useState(currentDay.notifcationTime??new Date())
  const [isTimeSet, setIsTimeSet] = useState(false);

  const save = async () => {

    const setTime=(event,time)=>{
      console.log('setting notification time')
setNotificationTime(time)
      setIsTimeSet(true)
    }
 
    //is There a notification and a time set for the notification?
    if(!isTimeSet && tempNotificationText?.length){
     //Get time for notification with dateTimePicker
      //this picker cannot be moved from this component
      DateTimePickerAndroid.open({
        value:new Date(),
        onChange:setTime,
        mode:'time',
        display:'spinner'
  
        })

        return;
      }
    const now= new Date()
    console.log(notificationTime,now)
      //cannot set a notification time in the past
      if(isTimeSet && notificationTime<now && currentDay.date<new Date()){
        console.log('not in the past')
        alert('Notfication time cannot be in the past');
        setIsTimeSet(false)
        return;
      }
      
      //either no notification or time is set for the notfication if there is one
    try {
      console.log('saving')
      let response;
      response = await saveDayInStorage(currentDay,tempNotificationText,notificationTime,tempText);
      alert(response)
    
      resetCurrentDay(setCurrentDay,tempText,tempNotificationText,notificationTime);//set day in app *important*


      if (tempNotificationText.length) {
       
        
      const scheduleTime=currentDay.date.setHours(notificationTime.getHours(),notificationTime.getMinutes(),0,0)
      console.log('schedule time =>',scheduleTime)

      response=await schedulePushNotification('Reminder',tempNotificationText,{},scheduleTime)
      console.log(JSON.stringify(response,null,2))
      alert (response.message)
      
     
      } else {
        try {
          const data=await AsyncStorage.getItem(currentDay.date.toDateString())
          console.log('data',data)
          if(data){
            if (data?.notificationText?.length){
            let response = await removeScheduledNotification(currentDay.date);
            console.log('removed notification from AsyncStorage',response)
             response=await deletePushNotification(currentDay.date)
             console.log('response => ',JSON.stringify(response,null,2))
             console.log('unschedule response =>',response?.message)
             alert(`Removed notifications`)
          }
         }
        } catch (e) {
          alert(`Error removing notification ${e}`);
        }
      }
    } catch (e) {
      Alert.alert("Error saving data");
      console.log(e);
    }
  
    setIsEditing(false);
    setIsTimeSet(false)
  };








  return (
    <View style={styles.editView}>
      <Text>Editing</Text>
      <Text style={styles.dateText}>
        {currentDay ? currentDay.date.toDateString() : today.toDateString()}
      </Text>

      <TextInput
        editable
        multiline
        numberOfLines={40}
        maxLength={500}
        onChangeText={(text) => setTempText(text)}
        value={tempText}
        style={styles.textInput}
        placeholder={'Enter diary entry'}
      />

      <Text style={{ fontSize: 20 }}>Set notification</Text>
      {/* editing today or anytime in future? show notification text input*/}
      {currentDay.date>today-86400000 && 
       <TextInput
        editable
        multiline
        numberOfLines={1}
        maxLength={50}
        onChangeText={(text) => setTempNotificationText(text)}
        value={tempNotificationText}
        style={{ ...styles.textInput, flex: 0.4 }}
        placeholder={'Set a notification'}
      />
}

      <View style={styles.navButtons}>
        <Pressable style={styles.button} onPress={() => setIsEditing(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};
