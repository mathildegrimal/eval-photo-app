import { CapturedPicture } from "expo-camera/build/Camera.types";

export interface PictureState {
    value:Picture[]  | null;
    error:string | null;
}

export interface  Picture extends CapturedPicture
{
    saved:boolean;
}

