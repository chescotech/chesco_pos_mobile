import React from "react";
import AppFrame from "./Frame";
import { Provider } from "react-redux";
import store from "./AppStore";


export default function App() {
  return (
    <Provider store={store}>
      <AppFrame />
    </Provider>
  );
}
