import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import { contactLoader, RootLoader } from "./loader";
import { RootAction } from "./actions";
import EditContact, { editAction } from "./routes/edit";
import { destroyAction } from "./routes/destroy";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
    action: RootAction,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "/contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
  {
    path: "/product",
    element: <Product />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
