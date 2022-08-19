import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "./Router";
import { Provider } from "react-redux";
import { persistorItems, store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorItems}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
