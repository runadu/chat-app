// import { configureStore } from "@reduxjs/toolkit";
// import conversationsReducer from "@/features/conversations/conversationsSlice";

// export const store = configureStore({
//   reducer: {
//     conversations: conversationsReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import conversationsReducer from "@/features/conversations/conversationsSlice";
// import streamingReducer from './streamingSlice'
// import uiReducer from './uiSlice'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["conversations"], // 只持久化對話，不存 streaming/ui 狀態
};

const rootReducer = combineReducers({
  conversations: conversationsReducer,
  //   streaming: streamingReducer,
  //   ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
