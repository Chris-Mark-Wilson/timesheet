import { View, Text } from "react-native";
import { StyleSheet,Pressable } from "react-native";
import { useEffect, useState } from "react";

import { Button } from "@react-navigation/elements";

export const WeekView = () => {
  const today = new Date();
  const [date, setDate] = useState(new Date());
  const [weekEnding, setWeekEnding] = useState(date);

  useEffect(() => {
    setWeekEnding((prev) => {
      const newDate = new Date(prev);

      const day = newDate.getDay();
      const thisDate = newDate.getDate();
      newDate.setDate(thisDate + (7 - day));
      return newDate;
    });
  }, []);

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

  return (
    <View style={styles.date}>
      <Text style={{ fontSize: 15 }}>Week View</Text>
      <Text style={{ fontSize: 20 }}>Todays date</Text>
      <Text style={styles.dateText}>{today.toDateString()}</Text>
      <Text style={{ fontSize: 20 }}>Week Ending</Text>
      <Text style={styles.dateText}>{weekEnding.toDateString()}</Text>
      <View style={styles.dateButtons}>
        <Pressable style={styles.navButtons} onPress={() => {changeDate("back");}}>
        <Text style={styles.arrows}>⬅️</Text>
        </Pressable>
        <Pressable style={styles.navButtons} onPress={() => {changeDate("forwards");}}>
       <Text style={styles.arrows}>➡️</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  date: {
    flex: 0.8,
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "start",
  },
  dateText: {
    fontSize: 30,
  },
  dateButtons:{
    flexDirection:'row',
    width:300,
    justifyContent:'space-around'
  },
  navButtons:{
    height:100,
    justifyContent:'center',
    padding:0,
    margin:0
  },
  arrows:{
    height:50,
    fontSize:30
  }
});
