import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imageContainer:{
        paddingTop: 40
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain'
    },
    form: {
        backgroundColor: 'white',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        
        position: 'absolute',
        bottom: 0
    },
    inputContainer:{
        paddingHorizontal: 30,
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10
    }
})

export default styles;