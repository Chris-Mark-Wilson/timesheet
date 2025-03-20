import { styles } from "./styles/styles.js";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  removeScheduledNotification,
  schedulePushNotification,
  deletePushNotification
} from "../functions/pushNotifications.js";
import { getTime } from "../functions/timePicker.js";
import { resetCurrentDay, saveDayInStorage } from "../functions/storage.js";



export const Edit = ({ today, currentDay, setCurrentDay, setIsEditing }) => {
  const [tempText, setTempText] = useState(
    currentDay.text ? currentDay.text : ""
  );
  const [tempNotificationText, setTempNotificationText] = useState(
    currentDay.notificationText ? currentDay.notificationText : ""
  );

  const [notificationTime,setNotificationTime]=useState(currentDay.notificationTime?currentDay.notificationTime:new Date())
  const [isTimeSet,setIsTimeSet]=useState(false)

  const save = async () => {
    console.log('in save')
    if(!isTimeSet && tempNotificationText?.length){
      console.log('getting time');
      const t=getTime(notificationTime,setNotificationTime,setIsTimeSet);
      console.log(t)
      // return
    }
    else {
    
    try {
      let response;
      response = await saveDayInStorage(currentDay,tempNotificationText,notificationTime);
      alert(response)
    
      resetCurrentDay(setCurrentDay);


      if (tempNotificationText.length) {
        //get a time for the notification
      response=await schedulePushNotification('Reminder',tempNotificationText,{},currentDay.date)
      alert (response)
      
     
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

      <TextInput
        editable
        multiline
        numberOfLines={40}
        maxLength={500}
        onChangeText={(text) => setTempNotificationText(text)}
        value={tempNotificationText}
        style={{ ...styles.textInput, flex: 0.4 }}
        placeholder={'Set a notification'}
      />

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
