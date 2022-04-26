import {StyleSheet, View} from 'react-native';
import React from 'react';
import MyCamera from './components/MyCamera';
import {Provider} from "react-redux";
import {store} from "./store/store";
import MyGallery from "./components/MyGallery";

export default function App() {
    return (
      <View style={styles.container}>
          <Provider store={store}>
              <MyCamera />
              <MyGallery />
          </Provider>
      </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});