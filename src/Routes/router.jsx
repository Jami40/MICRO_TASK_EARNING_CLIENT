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
import WorkerHome from "../pages/Worker/WorkerHome";
import TaskList from "../pages/Worker/TaskList";
import DashBoardHome from "../Layout/DashBoard/DashBoardHome";
import WorkerDetails from "../pages/Worker/WorkerDetails";
import MySubmission from "../pages/Worker/MySubmission";

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
          element:<DashBoardHome></DashBoardHome>
        },
        {
          path:'BuyersHome',
          element:<BuyersHome></BuyersHome>
        },
        {
          path:'workerHome',
          element:<WorkerHome></WorkerHome>

        },
        {
          path:'add-tasks',
          element:<AddTask></AddTask>,

        },
        {
          path:"my-tasks",
          element:<MyTask></MyTask>
        },
        {
          path:'task-list',
          element:<TaskList></TaskList>
        },
        {
          path:'task-details/:id',
          element:<WorkerDetails></WorkerDetails>,
          // loader:({params})=>fetch(`http://localhost:5000/task/${params.id}`)
        },
        {
          path:'my-submissions',
          element:<MySubmission></MySubmission>

        }

 ]}
  ]);