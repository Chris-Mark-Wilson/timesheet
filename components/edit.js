import { styles } from "./weekView"
import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";

export const Edit=({today,currentDay,setCurrentDay,setIsEditing})=>{

    const onChangeText = (text) => {
        console.log(text);
        setCurrentDay((prev) => {
          const newDay = { ...prev };
          newDay.text = text;
          return newDay;
        });
      };

      const save=()=>{
        
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
                    onChangeText={(text)=>onChangeText(text)}
                    value={currentDay.text?currentDay.text:''}
                    style={styles.textInput}
                  /> 
            
              <Text style={styles.preview}>{currentDay.text?currentDay.text:'No Data to show'}</Text>
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