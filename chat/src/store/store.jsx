import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messagesSlice";
import storageSession from "redux-persist/lib/storage/session"; // Use sessionStorage
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "messages",
  storage: storageSession, // Saves state in sessionStorage
};

const persistedMessageReducer = persistReducer(persistConfig, messageReducer);

export const store = configureStore({
  reducer: {
    messages: persistedMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore redux-persist actions
      },
    })
});

export const persistor = persistStore(store);