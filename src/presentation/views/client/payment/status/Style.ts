import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingHorizontal: 30
    },
    image:{
        width: 100,
        height: 100
    },
    description:{
        fontSize: 17,
        textAlign: "center",
        marginTop: 30,
        fontWeight: "bold"
    },
    info:{
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 10,
        paddingHorizontal: 40,
        textAlign: "center"
    },
    button:{
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        marginBottom: 20
    }
})

export default styles;