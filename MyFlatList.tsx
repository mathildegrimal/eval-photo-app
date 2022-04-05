import React, {useState} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import {CapturedPicture} from "expo-camera/build/Camera.types";

const Picture : React.FunctionComponent<{item : CapturedPicture}> = ({item}) => (
    <Image source={{uri:item.uri}} style={styles.image} />
);

const renderPicture : React.FunctionComponent<{item : CapturedPicture}> = ({item}) => (
    <Picture item={item}/>
);

interface FlatListDataProps {
    data:CapturedPicture[];
}

export default function MyFlatList({data}:FlatListDataProps){

    return (
        <View>
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
    image:{
        width:70,
        height:70,
    }
});
