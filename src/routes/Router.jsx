import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ForgetPassword from "../components/Auth/ForgetPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import Contact from "../../../studio/src/pages/Contact";
import DashboardLogin from "../components/Dashboard/DashboardAuth/DashboardLogin";
import PrivateRoute from "../components/Dashboard/DashboardAuth/PrivateRoute";
import AddProducts from "../components/Dashboard/AddProducts";
import AllProducts from "../components/Dashboard/AllProducts";
import PublicRoute from "../components/Dashboard/DashboardAuth/PublicRoute";

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
        ]
    }
])