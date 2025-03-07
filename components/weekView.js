import { View, Text,ScrollView } from "react-native";
import { StyleSheet,Pressable,TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Edit } from "./edit";
import { Button } from "@react-navigation/elements";

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

  useEffect(()=>{
    // get the data and enter into days array..
   days && (
    setDays((prev)=>{
      const newdays=prev.map(day=>day)
      newdays.forEach((day,index)=>{
        const newDate=new Date(weekEnding)
        newDate.setDate(newDate.getDate()+index-6)
        day.date=newDate
      })
      return newdays
    })
  )

  },[weekEnding])


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
console.log('in edit',day)
console.log(weekEnd)
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
export const styles = StyleSheet.create({
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
    width:'100%',
    justifyContent:'space-around'
  },
  navButtons:{
    flexDirection:'row',
    height:50,
    justifyContent:'space-around',
    width:'100%',
    padding:0,
    margin:0
  },
  arrows:{
    height:50,
    fontSize:30
  },
  scrollView:{
    flex:1,
    borderWidth:1,
    width:'100%'
  },
  listItem:{
    flex:1,
    borderWidth:1,
    width:'100%',
    height:80
  },

button: {
  height: 30,
  width: 100,
  backgroundColor: "#32a852",
  justifyContent: "center",
  alignItems:'center',
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  borderBottomLeftRadius: 50,
  borderBottomRightRadius: 50,
},
buttonText: {
  fontSize: 15,
  color:'white',
},
preview:{
  flex:1,
  fontSize:10,
  borderWidth:1,
  borderRadius:5,
  padding:5,
  width:'100%',
  
},
editView:{
  flex:1,
  borderWidth:2,
  width:'100%',
  alignItems:'center',
  justifyContent:'start'
},
textInput:{
  flex:1,
  width:'100%',
  height:'100%',
  borderWidth:1,
  borderRadius:5,
  padding:5,
  fontSize:20,

  textAlignVertical:'top'
}
});
