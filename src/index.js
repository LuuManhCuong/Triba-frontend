import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-tookit/store";
import GlobalStyle from "./components/globalStyle/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
