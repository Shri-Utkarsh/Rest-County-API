import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import CountryDetail from "./components/CountryDetail.jsx";
import "./App.css"
import Contact from "./components/Contact.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/:CountryDetail',
        element: <CountryDetail />,
      },
    ],
  },
])

const root = createRoot(document.querySelector("#root"));

root.render(<RouterProvider router={router} />);
