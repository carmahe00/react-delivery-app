import React, { useState } from 'react'
import { Modal, View, Alert, StyleSheet, Text } from 'react-native';
import RoundedButton from './RoundedButton';
interface Props {
    openGallery: () => void,
    openCamera: () => void,
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const ModalPickerImage = ({ openCamera, openGallery, setModalVisible, modalVisible }: Props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Select Image</Text>
                        <View
                            style={styles.buttonContainer}
                        >
                            <RoundedButton
                                text='Gallery'
                                onPress={() =>{
                                    openGallery()
                                    setModalVisible(false)
                                }}
                            />
                        </View>
                        <View
                            style={styles.buttonContainer}
                        >
                            <RoundedButton
                                text='Camera'
                                onPress={() =>{
                                    openCamera()
                                    setModalVisible(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: 220,
        width: 220,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default ModalPickerImage