import React, { useRef } from 'react'
import Header from './Header';

function AddBlog() {

    const titleRef=useRef();
    const descRef=useRef();


    const token=localStorage.getItem("token");


    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(" http://localhost:8080/addBlog",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    title:titleRef.current.value,
                    description:descRef.current.value,
                })
            })

            if(res.ok){
                console.log("added successfully");
            }
            else{
                console.log("error while adding");
                
            }
            
        } catch (error) {

            console.log(error);
            
            
        }

    }

  return (
    <>
        <div className="flex flex-col space-y-4">
            <Header/>
            <div className='flex flex-col items-center space-y-10 px-6 py-4'>
                <h1 className='text-4xl font-bold text-center uppercase'>Add your Blog</h1>
                <form onSubmit={(e)=>submitForm(e)}>
                    <div className='flex mt-2 flex-col space-y-2'>
                        <label className='text-xl uppercase font-semibold'>Title</label>
                        <input placeholder="Enter the blog title" className='bg-transparent border border-gray-400 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-2xl' ref={titleRef} type='text'/>
                    </div>

                    <div className='mt-4 flex flex-col space-y-2'>
                        <label className='text-xl uppercase font-semibold' > password</label>
                        <textarea placeholder="Write your blog.." className='bg-transparent w-[500px] border border-gray-400 px-4 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-2xl' ref={descRef} type='text'/>
                    </div>

                    <button className='text-xl uppercase font-semibold border border-gray-400 px-2 py-1 rounded-2xl mt-5 cursor-pointer'>submit</button>

                </form>
            </div>
        </div>
    </>
  )
}

export default AddBlog