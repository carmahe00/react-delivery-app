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
        height: '40%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    
    
    formText: {
        fontWeight: 'bold',
        fontSize: 16
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
        top: '15%',
        alignItems: 'center'
    },
    logoImage: {
        height: 100,
        width: 100
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
});

export default styles;