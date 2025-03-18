import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

// what the fuck is going on here the trigger is setting date to todays
//date irrespective of notificationDate???
export const saveNotification = async (notificationDate, notificationText) => {
  const data = { notificationText };
  await AsyncStorage.setItem(notificationDate.toDateString(), JSON.stringify(data));
  
  const notificationTime = new Date(notificationDate);
  notificationTime.setHours(6, 0, 0, 0);
  console.log('in notifications', notificationTime);

  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily Reminder',
      body: notificationText,
    },
    trigger: {
      date: notificationTime, // Schedule for 6 AM on the specified date
    },
  });
};
  
  export const removeNotification = async (date) => {
    

  
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
  return response
};