import { StyleSheet } from "react-native";

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '10%',
        alignItems: 'center'
    },
    logoImage: {
        height: 150,
        width: 150,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    form: {
        width: '100%',
        height: '50%',
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
    formImage: {
        height: 30,
        width: 30
    },
    formInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formContent:{
        marginLeft: 15
    },
    formTextDescription:{
        fontSize: 12,
    },
    imageLogout:{
        width: 40,
        height: 40
    },
    logout:{
        position: 'absolute',
        top: 30,
        right: 15
    },
    change:{
        position: 'absolute',
        top: 100,
        right: 15,
        backgroundColor: "white",
        borderRadius: 100
    }
})

export default ProfileStyle