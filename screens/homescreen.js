
import {View,Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";

import { Pressable } from 'react-native';
import { WeekView } from "../components/weekView";
import { useState,useEffect } from 'react';

export const HomeScreen = () => {
  const navigation = useNavigation();

 


 
  return (
    <View style={styles.container}>
      <WeekView />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Add Entry")}
      >
        <Text style={styles.buttonText}>Add Entry</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "start",
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: "#32a852",
    justifyContent: "center",
    alignItems:'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  buttonText: {
    fontSize: 25,
  },
});