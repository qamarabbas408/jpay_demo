import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import { PersistGate } from "redux-persist/es/integration/react";
import { stopLoaderAndEmptyErrors } from "./redux/reducers/AuthenticationReducer";
import { whiteLabelingRequest } from "./redux/reducers/WhiteLabelingReducer";
import { ThemeProvider } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import configureStores from "./redux/store";
import AppRouters from "./routes";
import ThemeContextProvider from "./context/ThemeContext";
import "./i18n";
import "./App.css";
import "./css/style.css";
import "react-toastify/dist/ReactToastify.css";

const { persistor, store } = configureStores();

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    store.dispatch(stopLoaderAndEmptyErrors());
    store.dispatch(
      whiteLabelingRequest({ subDomain: window.location.hostname })
    );
  }, []);

  //  ==--== use this code dynamic favicon
  // useEffect(() => {
  //   let link = document.querySelector("link[rel~='icon']");
  //   if (!link) {
  //     link = document.createElement("link");
  //     link.rel = "icon";
  //     document.getElementsByTagName("head")[0].appendChild(link);
  //   }
  //   link.href = "https://stackoverflow.com/favicon.ico";
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider dir={i18n.dir()}>
          <ThemeContextProvider>
            <AppRouters />
            <ToastContainer
              className={"toast-width custom-notification"}
              style={{ zIndex: 99999999999 }} // Chaipi
              position="top-center"
              autoClose={2000}
              progressStyle={false}
              limit={1}
              hideProgressBar
              draggable={false}
              closeButton={false}
              icon={true}
            />
          </ThemeContextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
