import React, { useRef } from 'react'
import { Link, redirect } from 'react-router-dom'

function Login() {

    const nameRef=useRef();
    const passRef=useRef();

    const handleLogin=async (e)=>{

        e.preventDefault();
        
        try {
            const res=await fetch("http://localhost:8080/signin",{
                method:"post",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    name:nameRef.current.value,
                    password:passRef.current.value
                })
            })

            if(res.ok){
                const data=await res.json();


                const token=data.token;


                console.log("In login",token);
            
                
                localStorage.setItem("token",token);


            


                
                
                setTimeout(()=>{
                    window.location.href = "/ShowAllBlog";
                },5000)
                
                
            }
            else{
                console.log("error while login");   
            }
            
        } catch (error) {

            console.log(error);
            
            
        }




    }

  return (

    <>

        <div className='flex h-screen items-center justify-center space-y-5 px-4 py-2'>
            <div className='flex flex-col items-center space-y-10 px-6 py-4'>
                <h1 className='text-4xl font-bold text-center uppercase'>Login</h1>
                <form onSubmit={(e)=>handleLogin(e)}>
                    <div className='flex mt-2 flex-col space-y-2'>
                        <label className='text-xl uppercase font-semibold'>name</label>
                        <input className='bg-transparent border border-gray-400 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-2xl' ref={nameRef} type='text'/>
                    </div>

                    <div className='mt-4 flex flex-col space-y-2'>
                        <label className='text-xl uppercase font-semibold' > password</label>
                        <input className='bg-transparent border border-gray-400 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-2xl' ref={passRef} type='text'/>
                    </div>

                <button className='text-xl uppercase font-semibold border border-gray-400 px-2 py-1 rounded-2xl mt-5 cursor-pointer'>submit</button>

                <p className='text-xl uppercase font-semibold mt-2'>Dont have an account?

                    <Link className='ml-3' to={"/"}>
                        Click here
                    </Link>
                </p>

                </form>
            </div>
        </div>
    
    </>
  )
}

export default Login