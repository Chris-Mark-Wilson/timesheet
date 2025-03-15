import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveNotification = async (date, notificationText) => {
    const data = { notificationText };
    await AsyncStorage.setItem(date.toDateString(), JSON.stringify(data));
  
    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Reminder',
        body: notificationText,
      },
      trigger: {
        date: new Date(date.setHours(6, 0, 0, 0)), // Schedule for 6 AM on the specified date
      },
    });
  };
  
  export const removeNotification = async (date) => {
    
    // const item = await AsyncStorage.getItem(date.toDateString());
    // if (item) {
    //   const parsed = JSON.parse(item);
    //   parsed.notificationText = '';
    //   await AsyncStorage.setItem(date.toDateString(), JSON.stringify(parsed));
    // }
  
    // Cancel the scheduled notification
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    notifications.forEach(notification => {
      if (notification.trigger.date === date.toISOString()) {
        Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    });
  };