import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2'
    },
    totalToPay: {
        flexDirection: "row",
        width: "100%",
        height: 70,
        backgroundColor: "#f2f2f2",
        justifyContent: "space-around",
        alignItems: "center"
    },
    totalInfo: {
        alignItems: "center"
    },
    totalText: {
        fontWeight: "bold",
        fontSize: 17
    },
    buttonAdd:{
        width: "50%"
    }

})

export default styles;