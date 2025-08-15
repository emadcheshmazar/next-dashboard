import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sliceRootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["persistElements"],
};

const persistedReducer = persistReducer(
  persistConfig,
  sliceRootReducer.withPersist
);

export const AppReduxStore = configureStore({
  reducer: {
    withoutPersist: sliceRootReducer.withoutPersist,
    withPersist: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REHYDRATE",
        ],
      },
    }),
});

export const persistor = persistStore(AppReduxStore);
export default AppReduxStore;
export type RootState = ReturnType<typeof AppReduxStore.getState>;
export type AppDispatch = typeof AppReduxStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// AppReduxStore.subscribe(() => {
//   // console.log(AppReduxStore.getState(), "redux store");
// });
