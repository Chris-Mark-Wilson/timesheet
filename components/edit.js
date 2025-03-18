import { styles } from "./styles/styles.js";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveNotification,
  removeNotification,
} from "../functions/notifications.js";
export const Edit = ({ today, currentDay, setCurrentDay, setIsEditing }) => {
  const [tempText, setTempText] = useState(
    currentDay.text ? currentDay.text : ""
  );
  const [tempNotificationText, setTempNotificationText] = useState(
    currentDay.notificationText ? currentDay.notificationText : ""
  );

  const save = async () => {
    try {
      await AsyncStorage.setItem(
        currentDay.date.toDateString(),
        JSON.stringify({
          text: tempText ?? "",
          notificationText: tempNotificationText ?? "",
        })
      );
      console.log("Data saved");
      setCurrentDay((prev) => {
        const newDay = { ...prev };
        newDay.text = tempText;
        if (tempNotificationText.length) {
          console.log("setting notification text");
          newDay.notificationText = tempNotificationText;
        }
        return newDay;
      });
      if (tempNotificationText.length) {
        try {
          console.log(currentDay.date);
          await saveNotification(currentDay.date, tempNotificationText);
          console.log('scheduled notification')
        } catch (e) {
          alert(`Error setting notification ${e}`);
        }
      } else {
        try {
          await removeNotification(currentDay.date);
          console.log('removed notification')
        } catch (e) {
          alert(`Error removing notification ${e}`);
        }
      }
    } catch (e) {
      Alert.alert("Error saving data");
      console.log(e);
    }
    setIsEditing(false);
  };



  return (
    <View style={styles.editView}>
      <Text>Editing</Text>
      <Text style={styles.dateText}>
        {currentDay ? currentDay.date.toDateString() : today.toDateString()}
      </Text>

      <TextInput
        editable
        multiline
        numberOfLines={40}
        maxLength={500}
        onChangeText={(text) => setTempText(text)}
        value={tempText}
        style={styles.textInput}
      />

      <Text style={{ fontSize: 20 }}>Set notification</Text>

      <TextInput
        editable
        multiline
        numberOfLines={40}
        maxLength={500}
        onChangeText={(text) => setTempNotificationText(text)}
        value={tempNotificationText}
        style={{ ...styles.textInput, flex: 0.4 }}
      />

      <View style={styles.navButtons}>
        <Pressable style={styles.button} onPress={() => setIsEditing(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};
