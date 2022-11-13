import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SecretFriend from "./routes/SecretFriend";
import "./index.scss";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Redirect from="/" to="/" />
        <Route path="/friends/:id">
          <SecretFriend />
        </Route>
        <Redirect from="/friends/:id" to="/friends/:id" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);
