import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { Button } from "@react-navigation/elements";

export const WeekView = () => {
  const today=new Date()
  const [date,setDate]=useState(new Date())
  const [weekEnding, setWeekEnding] = useState(date);

  useEffect(()=>{
    setWeekEnding((prev)=>{
      const newDate=new Date(prev)
     
      const day=newDate.getDay();
      const thisDate=newDate.getDate()
      newDate.setDate(thisDate+(7-day))
      return newDate;
    });
  },[date])
 


const changeDate = (direction) => {
  
  if(direction=='forwards'){
    if(weekEnding>today) {
      alert('you are not a time traveller');
      return
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
      {weekEnding && <Text style={styles.dateText}>{weekEnding.toDateString()}</Text>
}
<Button onPress={()=>{changeDate('forwards')}}>Forwards</Button>
<Button onPress={()=>{changeDate('back')}}>Back</Button>
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
});
