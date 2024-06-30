import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReduxTest from "./Pratical_Redux/ReduxTest.jsx";
import RTKTest from "./Pratical_Redux/RTKDemo/RTKTest.jsx";
import { Provider } from "react-redux";
import { store } from "./Pratical_Redux/RTKDemo/app/store.js";
import ReactRedux from "./Pratical_Redux/RTKDemo/ReactRedux.jsx";
import RouteError from "./RouteError.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
  },
  {
    path: "redux",
    element: <ReduxTest />,
  },
  {
    path: "rtk",
    element: <RTKTest />,
  },
  {
    path: "rrd",
    element: <ReactRedux />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
