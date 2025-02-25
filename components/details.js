
import { View,Text } from "react-native"; 
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
export const DetailsScreen=()=>
 {
  const navigation=useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details</Text>
        <Button onPress={() => navigation.push('Details')}>
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      </View>
    );
  }