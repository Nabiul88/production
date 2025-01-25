import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../layout/Main";
import Menu from "../pages/Menu";
import Order from "../pages/Order";
import ScrollToTop from "../components/ScrollToTop";
import ContactUs from "../pages/ContactUs";
import Cart from "../pages/Cart";
import Dashboard from "../layout/DashBoard";
import ManageItems from "../Dashboard/ManageItems";
import ManageOrder from "../Dashboard/ManageOrder";
import Kitchen from "../Dashboard/Kitchen";
import { AdminDashboard } from "../Dashboard/AdminDashboard";
import LoginPage from "../pages/login";
import AddMenuItem from "../Dashboard/AddItem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Main />
        <ScrollToTop />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order/:category",
        element: <Order />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "my-cart",
        element: <Cart />,
      },
      {
        path: '/login',
        element: <LoginPage/>,
}
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "manageitems",
        element: <ManageItems />,
      },
      {
        path: 'manageorders',
        element: <ManageOrder />,
      }
      ,
      {
        path: "kitchen",
        element: <Kitchen />
      }, {
        path: 'additem',
        element: <AddMenuItem />
      },
      {
        path: '/dashboard/admin',
        element:<AdminDashboard />,
      }
    ],
  },
]);
