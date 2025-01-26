import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import DashBoard from "../Layout/DashBoard/DashBoard";
import AddTask from "../pages/Buyers/AddTask";
import BuyersHome from "../pages/Buyers/BuyersHome";
import MyTask from "../pages/Buyers/MyTask";

 export const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
        },
        {
            path:'/register',
            element:<SignUp></SignUp>,
        },
        {
            path:'/login',
            element:<Login></Login>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<DashBoard></DashBoard>,
      children:[
        {
          path:'/dashboard',
          element:<BuyersHome></BuyersHome>
        },
        {
          path:'add-tasks',
          element:<AddTask></AddTask>,

        },
        {
          path:"my-tasks",
          element:<MyTask></MyTask>
        }

 ]}
  ]);