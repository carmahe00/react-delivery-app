import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    imageLocation:{
        height: 50,
        width: 50,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    },
    refPoint:{
        position: "absolute",
        backgroundColor: "#d4d4d4",
        width: "70%",
        paddingVertical: 4,
        top: 40,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    refPointText:{
        textAlign: "center",
        fontWeight: "bold"
    },
    refPointPoint:{
        position: "absolute",
        bottom: 40,
        width: "70%",
        alignSelf: "center"
    },
})

export default styles;