import React from 'react';

import {StyleSheet, View, FlatList,} from 'react-native';

import { useSelector} from "react-redux";
import { RootState } from "../store/store";
import { Picture } from '../store/picture.type';
import PictureItem from "./PictureItem";


const renderPicture : React.FunctionComponent<{item : Picture}> = ({item}) => (<PictureItem uri={item.uri} saved={item.saved}/>);

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
});
