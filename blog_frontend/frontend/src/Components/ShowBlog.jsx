import { HeartIcon, MessageSquare, SendHorizonalIcon } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from './Header';

function ShowBlog() {

    const token=localStorage.getItem("token")

    const {id}=useParams();
    console.log("In show Blog and your id",id.charAt(1));

    const blogId=id.charAt(1);
    
    const[blog,setBlog]=useState({});
    const[comment,setComment]=useState([]);
    const[like,setLike]=useState();
    const[unlike,setunlike]=useState({});
    

    const commRef=useRef();

        const getComment=async ()=>{
            try {

                const res=await fetch(`http://localhost:8080/getComment/${blogId}`,{
                    method:"GET",
                    headers:{
                        Authorization: `Bearer ${token}`
                    }})
                if(res.ok){
                    const data=await res.json();
                    console.log("it is comments",data);
                    setComment(data);   
                }
            } catch (error) {
                console.log("error to fetch comment",error);
                
            }
        }
        const getLikes=async ()=>{
            try {

                const res=await fetch(`http://localhost:8080/getlike/${blogId}`,{
                    method:"GET",
                    headers:{
                        Authorization: `Bearer ${token}`
                    }})
                if(res.ok){
                    const data=await res.text();
                    console.log("it is likes",data);
                    setLike(data);   
                }

            } catch (error) {
                console.log("error to fetch like",error);
                
            }
        }
    useEffect(()=>{
        getComment();
    },[])
    useEffect(()=>{
        getLikes();
    },[])




    useEffect(()=>{
        const getBlog=async ()=>{
            try {
                const res=await fetch(`http://localhost:8080/getBlog/${id.charAt(1)}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if(res.ok){
                    const data=await res.json();
                    console.log(data);
                    setBlog(data);   
                }
            } catch (error) {
                console.log("error while fetching",error);
            }
        }

        getBlog();
    },[])


    const addComment=async(id)=>{

        try {

            const res=await fetch(`http://localhost:8080/comment/${id}`,{
                method:"POST",
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body:commRef.current.value,
            });
            if (res.ok){

                console.log("added the comment successfully in db");
                commRef.current.value="";
                getComment();
            }
            else{
                console.log("error to add");
                
            }
        } catch (error) {

            console.log("error found",error);
            
            
        }
    }

    const handlelike=async()=>{

        try {
            const res=await fetch(`http://localhost:8080/like/${blogId}`,{
                method:"put",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });


            if(res.ok){
                console.log("liked");
                setunlike(prev => ({
                    ...prev,
                    [blogId]: !prev[blogId],
                }))
                getLikes();

            }
        } catch (error) {

            console.log(error);
        }
    }
    

  return (



    <>

        <div className='flex flex-col space-y-4'>
        <Header/>
        <div className='px-2 flex flex-col space-y-5'>

            {blog && 

                <>
                    <h1 className='text-3xl font-bold px-4 mt-6'>{blog.title}</h1>


                    <p className='text-md px-4'>{blog.description}</p>

                    <div className='bg-[#181c1f] text-white flex items-center justify-center space-x-2 rounded-xl border border-gray-600 ml-4 p-2 min-w-[50px] max-w-[70px]'>
                        <HeartIcon size={25} className={`cursor-pointer ${unlike[blog.id]?'text-red-600':'text-white'}`} onClick={()=>handlelike()}/>
                        <p>{like}</p>
                    </div>
                </>
            
            }



        </div>

        <h1 className='text-xl font-semibold px-4 mt-6'>Comments</h1>
        <hr className='my-2 border-gray-700' />

        <div className='flex flex-col space-y-4 px-4'>

        {/* Comment Input Section */}
        <div className='w-full flex items-center space-x-2'>
            <textarea
                ref={commRef}
                className='w-full h-20 p-3 bg-transparent border border-gray-600 rounded-md resize-none text-white focus:outline-none focus:ring-1 focus:ring-gray-400'
                placeholder='Enter your comment...'
            />
            <button onClick={() => addComment(blog.id)} className='p-2'>
                <SendHorizonalIcon size={20} className='text-white cursor-pointer' />
            </button>
        </div>

            {/* Comments Display */}
            <div className='space-y-3'>
                {comment.length === 0 ? (
                <p className='text-gray-400 italic'>No comments yet.</p>
                ) : (
                comment.map((items) => (
                    <div
                    key={items.id}
                    className='bg-gray-800 p-3 flex flex-col space-y-2 rounded-md border border-gray-700 text-white'
                    >
                    <h1 className='text-xl font-semibold'>{items.userid.name}</h1>
                    <p className='text-md'>{items.comments}</p>
                    </div>
                ))
                )}
            </div>
        </div>


        </div>

    
    
    </>
  )
}

export default ShowBlog