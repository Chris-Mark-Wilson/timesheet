import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const time = new Date(scheduleTime);
  console.log('time', time);

  const messagePayload = {
    token,
    title,
    body,
    data,
    scheduleTime: time.toISOString(),
  };

  const response = await fetch(`${renderUrl}/schedule-notification`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.log('Error:', errorResponse.message);
    return Promise.reject(new Error(errorResponse.message));
  }

  return response.json();
};

export const deletePushNotification = async (scheduleTime) => {
  const time = new Date(scheduleTime);
  const messagePayload = {
    scheduleTime: time.toISOString(),
  };

  const response = await fetch(`${renderUrl}/remove-notification`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.log('Error:', errorResponse.message);
    return Promise.reject(new Error(errorResponse.message));
  }

  return response.json();
};

export const clearAllScheduledNotifications = async () => {
  try {
    const response = await fetch(`${renderUrl}/remove-all-notifications`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log('Error:', errorResponse.message);
      return Promise.reject(new Error(errorResponse.message));
    }

    const jsonResponse = await response.json();
    console.log(JSON.stringify(jsonResponse, null, 2), jsonResponse.message);

    const result = await AsyncStorage.clear();
    return [jsonResponse, result ?? 'and frontend'];
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};