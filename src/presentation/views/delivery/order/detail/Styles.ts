import { StyleSheet } from "react-native";
import { MyColors } from "../../../../themes/AppTheme";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerList: {
        marginTop: 10,
        marginHorizontal: 15
    },
    products: {
        width: "100%",
        height: "50%"
    },
    info: {
        width: "100%",
        height: "50%",
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30
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
    deliveries: {
        fontWeight: "bold",
        marginTop: 15,
        color: MyColors.primary
    },
    totalInfo: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    total: {
        fontWeight: "bold",
        fontSize: 17
    },
    button: {
        width: "40%"
    }
})

export default styles;