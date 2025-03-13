import { View, Text, ScrollView } from "react-native";
import { Pressable } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Edit } from "./edit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./styles/styles";

export const WeekView = () => {
  const today = new Date();
  const [weekEnding, setWeekEnding] = useState(today);
  const [days, setDays] = useState([{ day: 'mon' }, { day: 'tue' }, { day: 'wed' }, { day: 'thur' }, { day: 'fri' }, { day: 'sat' }, { day: 'sun' }]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDay, setCurrentDay] = useState({});
  const [updated, setUpdated] = useState(false);
  const [ready, setReady] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications is required!');
      }
    };

    requestPermissions();
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
    const updateVersion = async () => {
      const keys = await AsyncStorage.getAllKeys();
      keys.forEach(async (key) => {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (typeof parsed != "object") {
            await AsyncStorage.setItem(key, JSON.stringify({ text: data }));
          }
        }
      });
    };
    updateVersion();
    setUpdated(true);
  }, []);

  useEffect(() => {
    console.log('useEffect triggered');
    if (days && updated) {
      console.log('useEffect with days and updated');

      const updateDays = async () => {
        const newDays = await Promise.all(
          days.map(async (day, index) => {
            const newDate = new Date(weekEnding);
            newDate.setDate(newDate.getDate() + index - 6);
            const newDay = { ...day, date: newDate };
            const data = await AsyncStorage.getItem(newDay.date.toDateString());
            if (data) {
              console.log('we have data', data, newDay.date);
              const parsed = JSON.parse(data);
              console.log('parsed => ', parsed);
              newDay.text = parsed.text;
              newDay.notificationText = parsed.notificationText ?? '';
            } else {
              newDay.text = '';
              newDay.notificationText = '';
              console.log('no data');
            }
            return newDay;
          })
        );
        setDays(newDays);
        return newDays;
      };

      updateDays().then((data) => {
        console.log('days => ', data, data.length);
        setReady(true);
        // Scroll to today's date
        const todayIndex = data.findIndex(day => day.date.toDateString() === today.toDateString());
        if (todayIndex !== -1 && scrollViewRef.current) {
          const itemHeight = 150; //height of list item in styles.js
          const scrollPosition = todayIndex * itemHeight;
          scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
        }
      });
    }
  }, [weekEnding, currentDay, updated]);

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
          <Text style={{ fontSize: 15 }}>Week View</Text>
          <Text style={{ fontSize: 20 }}>Todays date</Text>
          <Text style={styles.dateText}>{today.toDateString()}</Text>

          <ScrollView style={styles.scrollView} ref={scrollViewRef}>
            {ready &&
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