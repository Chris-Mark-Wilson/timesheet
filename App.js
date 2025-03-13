
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/homescreen';
import { AddEntry } from './screens/addEntry';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add Entry" component={AddEntry} />
    </Stack.Navigator>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('added subscription in app.js => ',notification);
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications is required!');
      }
    };
    
    //read the database for todays date, get any notifications then schedule

  

    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to check your calendar!",
          body: "Don't forget to check your appointments for today.",
        },
        trigger: {
          hour: 19,
          minute: 10,
          repeats: true,
        },
      });
    };

    requestPermissions();
    scheduleNotification()
  }, []);
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
