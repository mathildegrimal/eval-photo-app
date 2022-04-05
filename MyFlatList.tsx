import React, {useEffect, useState} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import { CapturedPicture } from "expo-camera/build/Camera.types";



const renderPicture : React.FunctionComponent<{item : CapturedPicture}> = ({item}) => (
    <Image source={{uri:item.uri}} style={styles.image} />
);

interface FlatListDataProps {
    data:CapturedPicture[];
}

export default function MyFlatList({data}:FlatListDataProps){
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={data}
                renderItem={renderPicture}
                keyExtractor={item => item.uri}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
    },
    image:{
        width:70,
        height:70,
        margin:5,
    }
});
