import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Dashboard from "../components/Dashboard/Dashboard";

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
                path:"/dashboard",
                element:<Dashboard />
            }
        ]
    }
])