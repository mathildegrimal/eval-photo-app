import {StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import React, {useState, useEffect, useRef,} from 'react';
import {CapturedPicture} from "expo-camera/build/Camera.types";
import MyFlatList from "./MyFlatList";
import MyCamera from './MyCamera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyGallery from './MyGallery';
import {Ionicons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

export default function App() {
    const [images, setImages]=useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    // useEffect(() => {
    //     //AsyncStorage.setItem('@pictures', '');
    //     if(images.length === 0){
    //         const images  = AsyncStorage.getItem("@pictures").then((images)=>{
    //             images && setImages(JSON.parse(images));
    //         });
    //     }
    //     if(images.length > 0){
    //         AsyncStorage.setItem('@pictures', JSON.stringify(images));
    //     }
    // }, [images]);

  return (
      <View style={styles.container}>
          <MyCamera images={images} setImages={setImages}/>
          {/*<MyFlatList data={images}/>*/}
          <MyGallery modalVisible={modalVisible} setModalVisible={setModalVisible} images={images}/>
          <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(true)}
          >
              <AntDesign name="picture" size={40} color="#f72585" />
          </TouchableOpacity>
      </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalButton:{
        position:'absolute',
        right:20,
        bottom:25,
    }
});