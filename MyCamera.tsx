import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import React, {useEffect, useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import {RootState} from "./store";
import {setPictures} from "./picture.store";

export default function MyCamera(){
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState<Camera | null>(null);
    const {value : pictures } = useSelector((state:RootState)=>state.picture);

    const dispatch = useDispatch();



    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);


    if (hasCameraPermission === null) {
        return <View />;
    }
    if (!hasCameraPermission) {
        return <Text>No access to camera</Text>;
    }


    const takePicture = async () => {
        if (!cameraRef) return;
        const picture = await cameraRef.takePictureAsync({ quality:0.5});
        if(pictures){
            const pictureToAdd = {...picture, saved:false};
            dispatch(setPictures([pictureToAdd, ...pictures]));
        } else {
            dispatch(setPictures([{...picture, saved:false}]));
        }
        await AsyncStorage.setItem('@pictures', JSON.stringify(pictures));
    }


    const setFace = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }
    return(
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={ref => {
                setCameraRef(ref) }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={setFace}>
                        <Ionicons name="ios-camera-reverse-outline" size={40} color="#f72585" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.snapButton}
                        onPress={takePicture}
                    >
                        <Ionicons name="heart-circle" size={80} color="#f72585" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        height:50,
        marginBottom:20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position:'absolute',
        left:0,
    },
    snapButton:{
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom:20,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    image:{
        position:'absolute',
        borderRadius:10,
        bottom:50,
        right:20,
        width:100,
        height:216,
    }

});