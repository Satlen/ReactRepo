import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Connexion from "./pages/connexion/Connexion.jsx";
import Inscription from "./pages/inscription/Inscription.jsx";
import { Toaster } from "react-hot-toast";
import HandleMutation from "./Test_HandleMutation/HandleMutation.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Pagination from "./Test_Pagination/Pagination.jsx";
import { InfiniteScroll } from "./Test_Scroll/InfiniteScroll.jsx";
import { QueryTest } from "./QueryTest.jsx";
import { Tailwind } from "./Tailwind/Tailwind.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "connexion",
    element: <Connexion />,
  },
  {
    path: "query",
    element: <QueryTest />,
    children: [
      {
        path: "handleMutation",
        element: <HandleMutation />,
      },
      {
        path: "pagination",
        element: <Pagination />,
      },
      {
        path: "scroll",
        element: <InfiniteScroll />,
      },
    ],
  },
  {
    path: "inscription",
    element: <Inscription />,
  },
  {
    path:'tailwind',
    element: <Tailwind/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
