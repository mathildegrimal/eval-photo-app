import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CapturedPicture } from "expo-camera/build/Camera.types";
import {Picture, PictureState} from "./picture.type";

const initialState: PictureState = {
    value: null,
    error: null,
};

export const pictureSlice = createSlice({
    name: "picture",
    initialState,
    reducers: {
        setPictures: (state, action: PayloadAction<Picture[]>) => {
            if (action.payload.length === 0) {
                state.error = "Erreur";
                state.value = null;
            } else {
                state.value = action.payload;
                state.error = null;
            }
        },
    },
});

export const { setPictures } = pictureSlice.actions;

export default pictureSlice.reducer;
