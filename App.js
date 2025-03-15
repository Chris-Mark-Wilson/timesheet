
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/homescreen';
import { AddEntry } from './screens/addEntry';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications'


const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add Entry" component={AddEntry} />
    </Stack.Navigator>
  );
}



export default function App() {


  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
