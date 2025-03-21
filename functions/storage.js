import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDayInStorage=async(currentDay,tempNotificationText,notificationTime,tempText)=>{
    try{
        await AsyncStorage.setItem(
            currentDay.date.toDateString(),
            JSON.stringify({
              text: tempText ?? "",
              notificationText: tempNotificationText ?? "",
              notificationTime: notificationTime ?? undefined
            })
          );
         return 'Saved in device storage';
    }
    catch(e){
        return Promise.reject(e)
    }
}

export const resetCurrentDay=(setCurrentDay,tempText,tempNotificationText,notificationTime)=>{
        setCurrentDay((prev) => {
        const newDay = { ...prev };
        newDay.text = tempText;
        if (tempNotificationText.length) {
          console.log("setting notification text");
          newDay.notificationText = tempNotificationText ?? "";
          newDay.notificationTime = notificationTime ?? undefined
        }
        return newDay;
      });
}