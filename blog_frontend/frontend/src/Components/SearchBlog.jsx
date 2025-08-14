import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

import { SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
function SearchBlog() {

    const token=localStorage.getItem("token")

    const navigate=useNavigate();

    const inpRef=useRef();

    const[blogs,setBlog]=useState([]);

    const handleSearch=async () => {

        try {

            const res=await fetch("http://localhost:8080/search",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    title:inpRef.current.value
                })
            })

            if (res.ok){
                const data=await res.json();
                console.log(data);
                setBlog(data);  
            }
            else{
                console.log("error while fetching");
                
            }
            
            
        } catch (error) {

            console.log(error);   
        }
    }

    const handleBlog=(id)=>{

        setTimeout(()=>{

            navigate(`/ShowBlog/:${id}`)

        },2000);

    }
    


  return (
    <>

        <div className="flex flex-col space-y-4">
            <Header/>
            <div className='flex flex-col items-center space-y-4'>

                <div className='flex space-x-2 items-center'>
                    <input placeholder='search blogs' ref={inpRef} className='px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white focus:outline-none focus:ring-1 focus:ring-gray-400' type='text'/>
                    <SearchIcon onClick={handleSearch} size={20} className='text-white cursor-pointer'/>
                </div>

                {blogs.length>0?blogs.map((items)=>
                    <div onClick={()=>handleBlog(items.id)} className='flex flex-col space-y-2 items-start hover:bg-[#181c1f] mt-5 w-2xl px-8 py-6 rounded-2xl cursor-pointer' key={items.id}>
                        <h1 className='text-3xl font-bold'>{items.title}</h1>

                        <p className='text-gray-400'>{items.description}</p>
                    </div>
                ):(<h1 className='text-3xl'>Enter the title</h1>)}
            </div>

        </div>
    
    </>
  )
}

export default SearchBlog