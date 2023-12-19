import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    imageContainer:{
        paddingTop: 20
    },
    image: {
        width: 150,
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
        marginTop: 50
    },
    imageCategory:{
        width: 30,
        height: 30
    },
    categoryInfo:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 5
    },
    divider:{
        width: 5,
        backgroundColor: '#f2f2f2'
    }
})

export default styles;