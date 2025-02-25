
import { View,Text } from "react-native"; 
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
export const AddEntry=()=>
 {
  const navigation=useNavigation();
    return (
      <View style={styles.container}>
        <Text>Add entry screen</Text>
        {/* <Button onPress={() => navigation.push('Details')}>
        Go to Details... again
      </Button> */}
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });