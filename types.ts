import { CapturedPicture } from "expo-camera/build/Camera.types";

export type geolocatedImage = {
    latitude:number;
    longitude:number;
} & CapturedPicture;