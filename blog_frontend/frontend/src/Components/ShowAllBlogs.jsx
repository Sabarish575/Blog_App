import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { HeartIcon,MessageSquare} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function ShowAllBlogs() {

    const[desc,setDesc]=useState([]);

    const token=localStorage.getItem("token");
    console.log(token);
    

    
    const navigate=useNavigate();
    const[unlike,setunlike]=useState({})

    const[likeCount,setLikeCount]=useState({});

    useEffect(() => {
      const showBlogs = async () => {
        try {

          const res = await fetch("http://localhost:8080/allBlog", {
            method:"GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if(res.ok){
            const data = await res.json();
            console.log(data);
            
            setDesc(data);
            data.forEach((blog) => getLikes(blog.id));
          }
          else{
            console.log("validation error");
            
          }
        } catch (error) {
          console.log(error);
        }
      };
      showBlogs();
    }, []);


      const getLikes=async (id)=>{
        try {

            const res=await fetch(`http://localhost:8080/getlike/${id}`, {
            method:"GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            if(res.ok){
                const data=await res.text();
                console.log("it is likes",data);
                setLikeCount((prev)=>({
                  ...prev,
                  [id]:data
                }));   
            }

        } catch (error) {
            console.log("error to fetch like",error);
            
        }
      }

    const handleLike=async (id)=>{

      try {

        await fetch(`http://localhost:8080/like/${id}`,{
          method:"PUT",
          headers:{
              Authorization: `Bearer ${token}`
          }
        });

        setunlike(prev => ({ ...prev, [id]: !prev[id] }));

        getLikes(id);
        
      } catch (error) {

        console.log(error);
        
      }
      
    }


    function handleCommentsPage(id){

      setTimeout(()=>{

        navigate(`/ShowBlog/:${id}`)
        
      },3000)

    }
    


  return (
    <>
      <div className="flex flex-col space-y-4">
        <Header/>
        <div className='w-full flex flex-col items-center space-y-5 justify-center'>
          {desc.map((elements)=>{
          return(

            
              <div className='flex flex-col space-y-2 items-start hover:bg-[#181c1f] mt-5 w-2xl px-8 py-6 rounded-2xl' key={elements.id}>
                <h1 className='text-3xl font-bold' >{elements.title}</h1>
                <p className='text-xl'>{elements.description}</p>


                <div className='flex space-x-4 mt-15 items-center justify-between w-xl px-4 py-2'>
                  <div onClick={()=>handleLike(elements.id)} className='bg-[#181c1f] cursor-pointer text-white flex items-center justify-center space-x-2 rounded-xl border border-gray-600 ml-4 p-2 min-w-[50px] max-w-[70px]'>
                    <HeartIcon size={25} className={`${unlike[elements.id]?'text-red-600':'text-white'}`}/>
                    <p>{likeCount[elements.id]||0}</p>
                  </div>
                <MessageSquare onClick={()=>handleCommentsPage(elements.id)} size={25} className='text-white cursor-pointer'/>
                </div>
              </div>
          )}
          )}
        </div>
      </div>
    </>
  )
}

export default ShowAllBlogs