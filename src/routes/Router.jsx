import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ForgetPassword from "../components/Auth/ForgetPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import Contact from "../pages/Contact"
import DashboardLogin from "../components/Dashboard/DashboardAuth/DashboardLogin";
import PrivateRoute from "../components/Dashboard/DashboardAuth/PrivateRoute";
import AddProducts from "../components/Dashboard/AddProducts";
import AllProducts from "../components/Dashboard/AllProducts";
import PublicRoute from "../components/Dashboard/DashboardAuth/PublicRoute";
import DashboardSignup from "../components/Dashboard/DashboardAuth/DasboardSignup";
import ComboProducts from "../pages/ComboProducts";
import CartPage from "../components/Cart/CartPage";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/contact-us",
                element:<Contact />
            },
            {
                path:"/combo-products",
                element:<ComboProducts />
            },
            {
                path:"add-to-cart",
                element:<CartPage />
            },
            {
                path:"/products",
                element:<Products />
            },
            {
                path:"/product-details/:id",
                element:<ProductDetails />
            },
            // Authenticated
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Signup />
            },
            {
                path:"/forget-password",
                element:<ForgetPassword />
            },
            {
                path:"/reset-password",
                element:<ResetPassword />
            },
            // Dashboard
            {
                path:"/dashboard",
                element:(
                    <PrivateRoute><Dashboard /></PrivateRoute>
                    // <Dashboard />
                )
            },
            {
                path:"/add-product",
                element:(
                    <PrivateRoute><AddProducts /></PrivateRoute>
                )
            },
            {
                path:"/all-products",
                element:(
                    <PrivateRoute><AllProducts /></PrivateRoute>
                )
            },
            // Dashboard auth
            {
                path:"/dashboard-login",
                element:(
                    <PublicRoute><DashboardLogin /></PublicRoute>
                )
            },
            {
                path:"/dashboard-signup",
                element:<DashboardSignup isAdmin={true}/>
            },
        ]
    }
])