import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useRef,} from 'react';
import { Camera } from 'expo-camera';
import {CapturedPicture} from "expo-camera/build/Camera.types";
import MyFlatList from "./MyFlatList";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [images, setImages]=useState<CapturedPicture[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (!cameraRef) return
    const photo = await cameraRef.takePictureAsync({base64:true});
    setImages([...images, photo]);
  }

  const setFace = () => {
    setType(
        type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
    );
  }

  return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={ref => {
          setCameraRef(ref) }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={setFace}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.snapButton}
                onPress={takePicture}
            >
            </TouchableOpacity>
          </View>
        </Camera>
        <MyFlatList data={images}/>
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
    borderRadius:50,
    width:60,
    height:60,
    borderWidth:4,
    borderColor:'white',
    backgroundColor:'red',
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