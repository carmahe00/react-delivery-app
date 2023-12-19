import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: 'black'
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.7,
      bottom: '30%'
    },
    form: {
      width: '100%',
      height: '65%',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20
    },
    formIcon: {
      height: 25,
      width: 25,
      alignSelf: 'flex-end'
    },
    formInput: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    formText: {
      fontWeight: 'bold',
      fontSize: 16
    },
    formTextInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#2D4356',
      flex: 1,
      marginLeft: 15
    },
    formRegister: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 20
    },
    formTextRegister: {
      fontStyle: 'italic',
      color: 'orange',
      textDecorationLine: 'underline',
      fontWeight: 'bold'
    },
    logoContainer: {
      position: 'absolute',
      alignSelf: 'center',
      top: '5%',
      alignItems: 'center'
    },
    logoImage: {
      height: 100,
      width: 100
    },
    roundedImage:{
      borderRadius: 75,
    },
    logoText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 10,
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
    
  });

  export default styles;