import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const navigate=useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("removed");
        
        navigate("/login"); // or wherever
    };


  return (


    <nav className='w-full mx-auto'>

        <div className='flex items-center justify-between w-full mx-auto px-2 py-4'>
            <div>
                <h1 className='text-2xl font-bold'>Blog App</h1>
            </div>


            <div className='flex space-x-5 items-center'>

                <Link className='text-xl' to={"/ShowAllBlog"}>Show All Blogs</Link>
                <Link className='text-xl' to={"/searchBlog"}>Search Blogs</Link>
                <Link className='text-xl' to={"/Addblog"}>Add Blog</Link>
                <button onClick={handleLogout} className='text-md uppercase 
                font-semibold hover:border hover:border-gray-400 px-2 py-1 rounded-2xl 
                cursor-pointer'>Logout</button>
            </div>

        </div>

    </nav>


    
  )
}

export default Header