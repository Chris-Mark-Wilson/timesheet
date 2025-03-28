import { View, Text, ScrollView, Button } from "react-native";
import { Pressable } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Edit } from "./edit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./styles/styles";

import * as Notifications from 'expo-notifications';
import { clearAllScheduledNotifications } from "../functions/pushNotifications";







export const WeekView = () => {
  const today = new Date();
  const [weekEnding, setWeekEnding] = useState(today);
  const [days, setDays] = useState([{ day: 'mon',date:new Date() }, { day: 'tue',date:new Date() }, { day: 'wed',date:new Date() }, { day: 'thur',date:new Date() }, { day: 'fri',date:new Date() }, { day: 'sat',date:new Date() }, { day: 'sun',date:new Date() }]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDay, setCurrentDay] = useState({});
  const [updated, setUpdated] = useState(true);
  const [ready, setReady] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications is required!');
        return;
      }

      // Get the token that identifies this device
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push notification token:', token);

      // Store the token in AsyncStorage or send it to your backend server
      await AsyncStorage.setItem('pushToken', token);
    };

    requestPermissions();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification);
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setWeekEnding((prev) => {
      const newDate = new Date(prev);
      const day = newDate.getDay();
      const thisDate = newDate.getDate();
      newDate.setDate(thisDate + (7 - day));
      return newDate;
    });
  }, []);




  useEffect(() => {
    // console.log('useEffect triggered');
    if (days && updated ) {
      // console.log('useEffect with days and updated');

      let newDays
      const updateDays = async () => {
        try{
         newDays = await Promise.all(

                days.map(async (day, index) => {
                  const newDate = new Date(weekEnding);
                  newDate.setDate(newDate.getDate() + index - 6);
                  const newDay = { ...day, date: newDate };
          
                  const data = await AsyncStorage.getItem(newDay.date.toDateString());
                  if (data) {
                    // console.log('we have data', data, newDay.date);
                    const parsed = JSON.parse(data);
                    // console.log('parsed => ', parsed);
                    newDay.text = parsed.text ?? '';
                    newDay.notificationText = parsed.notificationText ?? '';
                  } else {
                    newDay.text = '';
                    newDay.notificationText = '';
                    // console.log('no data');
                  }
                  return newDay;
                
                })
        );

      }
      catch(e){
        alert(`Failed to obtain data from device  ${e}`)
      }
        setDays(newDays);
      // alert('finished promise.all')
      };

      updateDays().then(()=>{
        // alert('in .then')
        setReady(true)
      });

     
      
      
    }
  }, [weekEnding, currentDay, updated]);

  useEffect(()=>{
    if(ready){
  // Scroll to today's date
  const todayIndex = days.findIndex(day => day.date.toDateString() === today.toDateString());
  if (todayIndex !== -1 && scrollViewRef.current) {
    const itemHeight = 150; //height of list item in styles.js
    const scrollPosition = todayIndex * itemHeight;
    scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
  }
    }
  },[ready])

  const changeDate = (direction) => {
    if (direction == "forwards") {
      setWeekEnding((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      });
    } else {
      setWeekEnding((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
    }
  };

  const edit = ((day) => {
    setCurrentDay(day);
    setIsEditing(true);
  });

  return (
    <>
      {!isEditing ? (
        <View style={styles.container}>

          {/* temp clear all button */}
          <Button
          title='Clear all scheduled'
          onPress={()=>{clearAllScheduledNotifications().then(response=>alert(`${response[0].message} - ${response[1]}`)).catch(e=>alert(`Problem - ${e}`))}}
          />
          
          <Text style={{ fontSize: 15 }}>Week View</Text>
          <Text style={{ fontSize: 20 }}>Todays date</Text>
          <Text style={styles.dateText}>{today.toDateString()}</Text>

          <ScrollView style={styles.scrollView} ref={scrollViewRef}>
            { ready &&
              days.map((day) => {
                return (
                  <Pressable
                    key={day.day}
                    style={{ ...styles.listItem, backgroundColor: day.date.toDateString() == today.toDateString() ? '#efc8b9' : '#e1efb9' }}
                    onPress={(e) => edit(day)}
                  >
                    <Text style={styles.previewDate}>{day.date && day.date.toDateString()}</Text>
                    <Text style={styles.preview}>
                      {day.notificationText ? day.notificationText : "No Appointments"}
                    </Text>
                    <Text style={styles.preview}>
                      {day.text ? day.text : "No data"}
                    </Text>
                  </Pressable>
                );
              })}
          </ScrollView>
          <Text style={{ fontSize: 20 }}>Week Ending</Text>
          <View style={styles.dateButtons}>
            <Pressable
              onPressIn={() => {
                changeDate("back");
              }}
            >
              <Text style={styles.arrows}>⬅️</Text>
            </Pressable>
            <Text style={styles.dateText}>{weekEnding.toDateString()}</Text>
            <Pressable
              onPressIn={() => {
                changeDate("forwards");
              }}
            >
              <Text style={styles.arrows}>➡️</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Edit
          today={today}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};
