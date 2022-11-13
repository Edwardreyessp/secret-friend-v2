import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SecretFriend from "./routes/SecretFriend";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "friend/:id",
        element: <SecretFriend />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <Routes>
        <Router path="/" element={<App />} />
        <Route path="/friend/:id" element={<SecretFriend />} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);
