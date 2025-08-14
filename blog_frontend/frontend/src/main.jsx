import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AddBlog from './Components/AddBlog.jsx';
import SearchBlog from './Components/SearchBlog.jsx';
import ShowAllBlogs from './Components/ShowAllBlogs.jsx';
import ShowBlog from './Components/ShowBlog.jsx';
import Login from './Components/Login.jsx';
import App from './App.jsx';
import "./index.css";

const router=createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/login",element:<Login/>},
  {path:"/Addblog",element:<AddBlog/>},
  {path:"/searchBlog",element:<SearchBlog/>},
  {path:"/ShowAllBlog",element:<ShowAllBlogs/>},
  {path:"/ShowBlog/:id",element:<ShowBlog/>},
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
