import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Signup() {


  const nameRef=useRef();
  const passRef=useRef();

  const navigate=useNavigate();

  async function handleSignup(e) {

    e.preventDefault();

    if(nameRef.current.value.trim()!="" && passRef.current.value.trim()!=""){

      try {
          const res = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameRef.current.value,
                password: passRef.current.value
            })
          })


          const response=await res.text();

          if(res.ok){
            console.log("success:  ",response);

            setTimeout(()=>{
              navigate("/login")
            })
            
          }
          
        
      } catch (error) {

        console.log("i cant send it though",error);
        
        
      }
      
    }


    
  }

  return (
    <>

        <div className='flex h-screen items-center justify-center space-y-5 px-4 py-2'>
            <div className='flex flex-col items-center space-y-10 px-6 py-4'>
                <h1 className='text-4xl font-bold text-center uppercase'>Signup</h1>
                <form onSubmit={(e)=>handleSignup(e)}>
                    <div className='flex mt-2 flex-col space-y-2'>
                        <label className='text-xl uppercase font-semibold'>name</label>
                        <input className='bg-transparent border border-gray-400 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-2xl' ref={nameRef} type='text'/>
                    </div>

                    <div className='mt-4 flex flex-col space-y-2'>
                        <label className='text-xl uppercase font-semibold' > password</label>
                        <input className='bg-transparent border border-gray-400 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-2xl' ref={passRef} type='text'/>
                    </div>

                <button className='text-xl uppercase font-semibold border border-gray-400 px-2 py-1 rounded-2xl mt-5 cursor-pointer'>submit</button>

                <p className='text-xl uppercase font-semibold mt-2'>Already have an account?

                    <Link className='ml-3' to={"/login"}>
                        Click here
                    </Link>
                </p>

                </form>
            </div>
        </div>
    
    </>
  )
}

export default Signup
