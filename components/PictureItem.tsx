import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import * as MediaLibrary from "expo-media-library";
import React, {useState} from "react";
import {setPictures} from "../store/picture.store";
import {Image, Platform, Share, StyleSheet, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AntDesign, Feather, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {BottomSheet, ListItem} from "@rneui/themed";
import axios from "axios";

interface ItemProps {
    uri: string;
    saved: boolean;
}

export default function PictureItem({ uri, saved}:ItemProps) {
    const {value : pictures } = useSelector((state:RootState)=>state.picture);
    const dispatch = useDispatch();

    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [isVisible, setIsVisible] = useState(false);

    const deletePicture = async ()=>{
        setIsVisible(true);
    }

    const savePicture = async (uriToAdd:string)=>{
        await requestPermission();
        if(status?.granted){
            const asset = await MediaLibrary.createAssetAsync(uriToAdd);


            /**** comment this part if node server is not listening *** /
             *
             */
            const formData = new FormData();
            const uriToSend = Platform.OS === 'ios' ? uriToAdd.split('file://')[1] : uriToAdd;
            const image = { name:'picture', type:'image/jpg', uri: uriToSend };

            // @ts-ignore
            formData.append('photo', image );

            await axios.patch('http://10.50.37.166:7070/multipart-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                transformRequest: () => {
                    return formData; // this is doing the trick
                }
            });
            ////////

            if(asset) {
                const savedPictures = pictures?.map(object => {
                    if (object.uri === uriToAdd) {
                        return {...object, saved: true};
                    } else {
                        return object;
                    }
                });
                if (savedPictures) {
                    dispatch(setPictures(savedPictures));
                }
            }
        }
    }

    const sharePicture = async (uriToShare:string)=>{
        try {
            await Share.share({
                url: uriToShare,
            });
        } catch (error: any) {
            alert(error.message);
        }
    }
    const list = [
        {
            title: 'Supprimer',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: async (uriToDelete:string) => {
                setIsVisible(false);
                if(pictures){
                    const keptPictures = pictures?.filter(object => object.uri !== uriToDelete);
                    dispatch(setPictures(keptPictures));
                    await AsyncStorage.setItem('@pictures', JSON.stringify(pictures));
                }
            },
        },
        {
            title: 'Annuler',
            containerStyle: { backgroundColor: 'white' },
            titleStyle: { color: 'black' },
            onPress: () => setIsVisible(false),
        },
    ];

    return(
        <View style={styles.imagesWrapper}>
            <Image source={{uri:uri}} style={styles.images} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={deletePicture}
                >
                    <SimpleLineIcons name="trash" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>sharePicture(uri)
                    }>
                    <Feather name="share" size={24} color="black" />
                </TouchableOpacity >
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>savePicture(uri)}
                >
                    { saved ? <Ionicons name="cloud-done-sharp" size={24} color="black" /> : <AntDesign name="cloudo" size={24} color="black" />}
                </TouchableOpacity>
                <BottomSheet modalProps={{}} isVisible={isVisible}>
                    {list.map((l, i) => (
                        <ListItem
                            key={i}
                            containerStyle={l.containerStyle}
                            onPress={()=>l.onPress(uri)}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </BottomSheet>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    imagesWrapper:{
        position:'relative',
        width:200,
        height:250,
    },
    images:{
        flex:1,
        borderRadius:10,
        margin:10,
    },
    buttonContainer:{
        width:'80%',
        display:'flex',
        flexDirection:'row',
        position:'absolute',
        bottom:15,
        right:15,
        justifyContent:'space-between',
    },
    button: {
        borderRadius:50,
        width: 40,
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        alignSelf: 'flex-end',
    },
});