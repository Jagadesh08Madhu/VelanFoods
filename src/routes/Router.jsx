import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ForgetPassword from "../components/Auth/ForgetPassword";
import ResetPassword from "../components/Auth/ResetPassword";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[
            {
                path:"/",
                element:<Home/>
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
            {
                path:"/dashboard",
                element:<Dashboard />
            }
        ]
    }
])