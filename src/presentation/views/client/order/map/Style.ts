import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    map: {
        height: "64%",
    },
    imageLocation: {
        height: 50,
        width: 50,
        position: "absolute",
        alignSelf: "center",
        top: "50%"
    },
    info: {
        backgroundColor: "white",
        height: "37%",
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 30,
        justifyContent: "flex-end",
        paddingVertical: 0

    },
    infoRow: {
        flexDirection: "row",
        flex: 1,
        marginTop: 15
    },
    infoText: {
        flex: 1
    },
    infoTitle: {
        color: "black"
    },
    infoDescription: {
        color: "gray",
        fontSize: 13
    },
    watchImage: {
        height: 25,
        width: 25
    },
    divider: {
        backgroundColor: "#c2c2c2",
        height: 1,
        width: "100%",
        marginTop: 15
    },
    imageClient: {

        width: 35,
        height: 35,
        borderRadius: 15
    },
    imagePhone: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    infoClient: {
        flexDirection: "row",
        alignItems: "center"
    },
    nameClient: {
        fontWeight: "bold",
        fontSize: 14,
        flex: 1,
    },
    markerImage: {
        height: 50,
        width: 50
    },
    back: {
        height: 30,
        width: 30
    },
    backContainer: {
        position: "absolute",
        top: 50,
        left: 20
    }
})

export default styles;