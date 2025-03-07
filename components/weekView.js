import { View, Text,ScrollView } from "react-native";
import { StyleSheet,Pressable,TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Edit } from "./edit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./styles/styles";
export const WeekView = () => {
  const today = new Date();
  const [date, setDate] = useState(new Date());
  const [weekEnding, setWeekEnding] = useState(today);
  const [days,setDays]=useState([{day:'mon'},{day:'tue'},{day:'wed'},{day:'thur'},{day:'fri'},{day:'sat'},{day:'sun'}])
  const [isEditing,setIsEditing]=useState(false)
  const [currentDay,setCurrentDay]=useState({})
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
    if (days) {
 
      const updateDays = async () => {
        const newDays = await Promise.all(
          days.map(async (day, index) => {
            const newDate = new Date(weekEnding);
            newDate.setDate(newDate.getDate() + index - 6);
            day.date = newDate;
            const data = await AsyncStorage.getItem(day.date.toDateString());
            if (data) {
              day.text = data;
            } else {day.text=''}
            return day;
          })
        );
        setDays(newDays);
      };
      updateDays();
    }
   
  }, [weekEnding, currentDay]);

  const changeDate = (direction) => {
    if (direction == "forwards") {
      if (weekEnding > today) {
        alert("you are not a time traveller");
        return;
      }
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

  const edit=((day,weekEnd)=>{

setCurrentDay(day)

setIsEditing(true)
  })
  


  return (<>
    {!isEditing ? (
    <View style={styles.date}>
      <Text style={{ fontSize: 15 }}>Week View</Text>
      <Text style={{ fontSize: 20 }}>Todays date</Text>
      <Text style={styles.dateText}>{today.toDateString()}</Text>
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
 
        <ScrollView style={styles.scrollView}>
          {days &&
            days.length &&
            days.map((day) => {
              return (
                <Pressable
                  key={day.day}
                  style={styles.listItem}
                  onPress={(e) => edit(day, weekEnding)}
                >
                  <Text>{day.date && day.date.toDateString()}</Text>
                  <Text style={styles.preview}>
                    {day.text ? day.text : "No data"}
                  </Text>
                </Pressable>
              );
            })}
        </ScrollView>
        </View>
      ) : (
        <Edit
          today={today}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          setIsEditing={setIsEditing}
        />
      )}

</> );
};

