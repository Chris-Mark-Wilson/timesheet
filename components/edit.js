import { styles } from "./styles/styles.js"
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Edit=({today,currentDay,setCurrentDay,setIsEditing})=>{
    const [tempText, setTempText] = useState(currentDay.text?currentDay.text:'');


      const save=async()=>{
        try {
await AsyncStorage.setItem(currentDay.date.toDateString(),tempText)
console.log('Data saved')
setCurrentDay((prev) => {
    const newDay = { ...prev };
    newDay.text = tempText;
    return newDay;
  });
        }
        catch(e){
            Alert.alert('Error saving data')
          console.log(e)
        }
setIsEditing (false)
      }
return(
     <View style={styles.editView}>
              <Text>Editing</Text>
              <Text>
                {currentDay ? currentDay.date.toDateString() : today.toDateString()}
              </Text>
           
              
                   <TextInput
                    editable
                    multiline
                    numberOfLines={40}
                    maxLength={500}
                    onChangeText={(text)=>setTempText(text)}
                    value={tempText}
                    style={styles.textInput}
                  /> 
            
              <Text style={styles.preview}>{tempText}</Text>
              <View style={styles.navButtons}>
    
              <Pressable style={styles.button} onPress={() => setIsEditing(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
      
              </Pressable>
              
              <Pressable style={styles.button} onPress={save}>
                <Text style={styles.buttonText}>Save</Text>
      
              </Pressable>
              </View>
      
            </View>

)}