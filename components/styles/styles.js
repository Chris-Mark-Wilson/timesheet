 import { StyleSheet } from "react-native";
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