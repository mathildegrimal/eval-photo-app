import { configureStore } from "@reduxjs/toolkit";
import picture from "./picture.store";
export const store = configureStore({
    reducer: {
        picture: picture,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
