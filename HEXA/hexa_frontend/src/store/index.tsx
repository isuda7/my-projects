import {combineReducers, configureStore} from "@reduxjs/toolkit";
import commonReducer from '@/store/modules/commonStore';
import userReducer from '@/store/modules/userStore';
import alertReducer from '@/store/modules/alertStore';
import notificationReducer from "@/store/modules/notificationStore";
import popupReducer from "@/store/modules/popupStore";
import storageSession from "redux-persist/lib/storage/session";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const persistConfig = {
  key: 'root',
  storage: storageSession,
};
const rootReducer = combineReducers({

  commonStore: commonReducer,
  alertStore: alertReducer,
  notificationStore: notificationReducer,
  userStore: userReducer,
  popupStore: popupReducer,

});
const persistedReduce = persistReducer(persistConfig, rootReducer);
const makeStore = () => {
  return configureStore({
    reducer: persistedReduce,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
  });
};
const store = makeStore();

export const persistor = persistStore(store);

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
