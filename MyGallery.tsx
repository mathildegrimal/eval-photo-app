import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import axios from "axios";
interface ModalProps{
    modalVisible:boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    images:string[];
}
export default function MyGallery({modalVisible, setModalVisible, images}:ModalProps){
    // const [images, setImages] = useState([]);
    //
    // useEffect(() => {
    //     (async () => {
    //         const {data} = await axios.get('https://api-pictures.herokuapp.com/pictures');
    //         setImages(data);
    //     })();
    // }, []);

    return (
        <View>
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
                        <View style={styles.gallery}>
                            {images && images.map((img:string, index:number)=>{

                                return(
                                <Image style={styles.images} source={{uri: `https://api-pictures.herokuapp.com/pictures/${img}`}} key={index} />
                                )
                            }
                            )}
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width:'90%',
        height:'90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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

    buttonClose: {
        backgroundColor: '#f72585',
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
    gallery:{
       flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        width:'100%',
    },
    images:{
        width:100,
        height:100,
        margin:5,
        borderRadius:10
    }
});
