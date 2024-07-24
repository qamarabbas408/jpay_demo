import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV == "development") {
  middlewares.push(createLogger());
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

const persistor = persistStore(store);

const configureStores = () => {
  return { persistor, store };
};

export default configureStores;
