 export const saveDayInStorage=async(currentDay,tempNotificationText,notificationTime)=>{
    try{
        await AsyncStorage.setItem(
            currentDay.date.toDateString(),
            JSON.stringify({
              text: tempText ?? "",
              notificationText: tempNotificationText ?? "",
              notificationTime: notificationTime ?? undefined
            })
          );
         return 'Saved';
    }
    catch(e){
        return Promise.reject(e)
    }
}

export const resetCurrentDay=(setCurrentDay)=>{
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