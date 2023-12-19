import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productImages: {
        width: "100%",
        height: "45%"
    },
    back: {
        position: "absolute",
        top: 15,
        left: 15
    },
    backImage:{
        width: 40,
        height: 40
    },
    productDetail: {
        position: "absolute",
        width: "100%",
        height: "56%",
        backgroundColor: "white",
        bottom: 0,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    productInfo: {
        padding: 30,
        flex: 1
    },
    name: {
        fontWeight: "bold",
        fontSize: 18
    },
    divider: {
        height: 1,
        backgroundColor: "#f2f2f2",
        marginVertical: 7
    },
    descriptionTitle: {
        marginVertical: 7,
        fontWeight: "bold",
    },
    descriptionContent: {
        fontSize: 13
    },
    productActions: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 30
    },
    actionText: {
        color: "white",
        fontSize: 15
    },
    actionLess: {
        backgroundColor: "#3a3a3a",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    quantity: {
        backgroundColor: "#3a3a3a",
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: "center",
    },
    actionAdd: {
        backgroundColor: "#3a3a3a",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    buttonAdd: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;