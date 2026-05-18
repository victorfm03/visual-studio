import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/home.jsx';
import Product from './pages/product.jsx';
import "./globalStyle.css";
import { ThemeProviderWrapper } from "./ThemeProvider.jsx";
import Category from './pages/category.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductModify from './pages/ProductModify.jsx';
import CategoryList from './pages/CategoryList.jsx';
import CategoryModify from './pages/CategoryModify.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path:"añadirProducto",
        element: <Product />
      },{
        path: "añadirCategoria",
        element: <Category />
      },{
        path:"productList",
        element: <ProductList />
      },{
        path:"modificarProducto/:id_product",
        element: <ProductModify />
      },{
        path:"CategoryList",
        element: <CategoryList />
      },{
        path:"modificarCategoria/:id_category",
        element: <CategoryModify />
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  </StrictMode>
);
