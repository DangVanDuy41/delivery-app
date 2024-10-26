import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

interface Props{
    openConfirm:boolean
    handleConfirm:(active:boolean)=>void
}
const ModalConfirm = ({openConfirm,handleConfirm}:Props) => {
    return (
        <Modal transparent={true} visible={openConfirm} animationType="fade" >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Are you sure?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleConfirm(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ModalConfirm;