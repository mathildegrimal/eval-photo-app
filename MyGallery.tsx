import React, { useState} from 'react';

import {StyleSheet, View, Image, FlatList, TouchableOpacity, Share,} from 'react-native';
import { BottomSheet, ListItem } from '@rneui/themed';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {AntDesign, Feather, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {setPictures} from "./picture.store";
import * as MediaLibrary from 'expo-media-library';
import { Picture } from './picture.type';

interface ItemProps {
    uri:string;
    saved:boolean;
}

const renderPicture : React.FunctionComponent<{item : Picture}> = ({item}) => (<PictureItem uri={item.uri} saved={item.saved}/>);

function PictureItem({ uri, saved}:ItemProps) {
    const {value : pictures } = useSelector((state:RootState)=>state.picture);
    const dispatch = useDispatch();
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [isVisible, setIsVisible] = useState(false);

    const deletePicture = async (uriToDelete:string)=>{
        setIsVisible(true);
    }

    const savePicture = async (uriToAdd:string)=>{
        await requestPermission();
        const asset = await MediaLibrary.createAssetAsync(uriToAdd);
        if(asset) {
            const savedPictures = pictures?.map(object => {
                if (object.uri == uriToAdd) {
                    return {...object, saved: true};
                } else {
                    return object;
                }
            });
            if (savedPictures) {
                setPictures(savedPictures);
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
                onPress={()=>deletePicture(uri)}
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

export default function MyGallery(){

    const {value : pictures } = useSelector((state:RootState)=>state.picture);

    return (
        <View style={styles.gallery}>
            <FlatList
                horizontal
                data={pictures}
                renderItem={renderPicture}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gallery:{
        display:'flex',
        height:300,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center',
    },
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
