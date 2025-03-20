import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export const getTime=(notificationTime,setNotificationTime,setIsTimeSet)=>{
  console.log('type=> ',typeof(notificationTime),JSON.stringify(notificationTime,_,2))
// DateTimePickerAndroid.open({
// value:notificationTime,
// onChange:()=>{setNotificationTime(notificationTime);
//    setIsTimeSet(true)},
// mode:'time'
// })
return notificationTime
}