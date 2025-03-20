import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

// what the fuck is going on here the trigger is setting date to todays
//date irrespective of notificationDate???

  
  export const removeScheduledNotification = async (date) => {
    // Cancel the scheduled notification
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    notifications.forEach(notification => {
      if (notification.trigger.date === date.toISOString()) {
        Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    });
  };
  const renderUrl = 'https://timesheet-ofqs.onrender.com'; // Replace with your Render URL

export const schedulePushNotification = async (title, body, data, scheduleTime) => {
  const token = await AsyncStorage.getItem('pushToken');
  if (!token) {
    console.error('No push token found');
    return;
  }

  const time = new Date(scheduleTime)
  time.setHours(15,48,0,0);
  console.log('time',time) 
  const messagePayload = {
    token,
    title,
    body,
    data,
    scheduleTime:time.toISOString(),
  };

   const response = await fetch(`${renderUrl}/schedule-notification`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });
  return response.json()
};

export const deletePushNotification = async (scheduleTime)=>{
  const time = new Date(scheduleTime)
  const messagePayload = {
     scheduleTime:time.toISOString(),
  };
  const response = await fetch(`${renderUrl}/remove-notification`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });
  return response.json()

}

export const clearAllScheduledNotifications = async () =>{
  const response= await fetch(`${renderUrl}/remove-all-notifications`,{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type': 'application/json',
    }
  })
  return response.json();
}