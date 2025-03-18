import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

// what the fuck is going on here the trigger is setting date to todays
//date irrespective of notificationDate???
export const saveNotification = async (notificationDate, notificationText) => {
    const data = { notificationText };
    await AsyncStorage.setItem(notificationDate.toDateString(), JSON.stringify(data));
  console.log('in notifiactions',new Date(notificationDate.setHours(6, 0, 0, 0)))
    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Reminder',
        body: notificationText,
      },
      trigger: {
        date: new Date(notificationDate.setHours(6, 0, 0, 0)), // Schedule for 6 AM on the specified date
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