import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    dropdownContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        flex: 1
    },
    textNumberInstallments: {
        marginHorizontal: 20,
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 18
    },
    buttonContainer: {
        width: "100%",
        marginHorizontal: 20,
        paddingBottom: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderCreatedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray', // You can customize the color
        textAlign: 'center',
        marginVertical: 10, // Adjust the vertical margin as needed
    },
})

export default styles;