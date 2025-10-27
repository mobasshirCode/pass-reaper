import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

function Manager() {

  const ref = useRef()
  const passRef = useRef()
  const [form,setForm] = useState({site:"", username:"", password:""})
  const [passArray, setPassArray] = useState([])

  useEffect(()=>{
    let passwords = localStorage.getItem("passwords")
    if(passwords){
      setPassArray(JSON.parse(passwords))
    }
  },[])


  const viewPass = ()=> {
    // alert("working h yaha tk")
    if(ref.current.src.includes("assets/hidden.png")) {
      ref.current.src = "src/assets/view.png"
      passRef.current.type = "text"
    }
    else {
      ref.current.src = "src/assets/hidden.png"
      passRef.current.type = "password"
    }
  }

  const savePass = ()=>{
    console.log([...passArray, form])
    if(form.site.length > 2 && form.username.length > 2 && form.password.length > 2){
    setPassArray([...passArray, {...form , id: uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passArray, {...form , id: uuidv4()}]))
    toast.success('Password saved !', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    // transition: Bounce,
    });
    // setForm({site:"", username:"", password:""})
  }}

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
  }

  const copyBtn = (text)=> {
    toast.info('Copied to clipboard !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text)
  }
  
  const handleEdit = (id)=> {
    setForm(passArray.filter((item)=> item.id === id)[0])
    setPassArray(passArray.filter((item)=> item.id !== id))
  }

  const handleDelete = (id)=> {
    let c = confirm("Do you really want to Delete this Password")
    if(c){
    setPassArray(passArray.filter((item)=> item.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passArray.filter((item)=> item.id !== id)))
    toast.error('Data deleted !', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
    });
  }}

  return (
    <div>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      // transition={Bounce}
      />
        <div className="fixed top-0 left-0 -z-10 min-h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]"></div>
          <div className="md:container min-h-[83.6vh] p-5 mx-auto md:px-40 my-5 mt-10 w-full">
            <div className='flex flex-col items-center text-white'>
             <div className='text-3xl font-bold'>
                <span className='text-purple-700'>&lt;</span>
                Pass<span className='text-purple-700'>Reaper/</span>
                <span className='text-purple-700'>&gt;</span></div>
             <div>No more password headaches</div>
            </div>
            <div className='flex flex-col md:px-30 px-3 items-center md:gap-6 gap-3 my-6'>
              <input value={form.site} onChange={handleChange} placeholder='Enter URL' type="text" name="site" className='text-white w-full rounded-full px-5 py-2 border border-purple-700' />
              <div className='flex flex-col md:flex-row md:gap-8 gap-3 w-full'>
                <input value={form.username} onChange={handleChange} placeholder='username' type="text" name="username" className='text-white w-full rounded-full px-5 py-2 border border-purple-700' />
                <div className='w-full relative'>
                  <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Password' type="password" name="password" className='text-white  w-full rounded-full px-5 py-2 border border-purple-700 ' />
                  <img ref={ref} className='absolute top-2 right-3 invert hover:cursor-pointer' width={25} src="src/assets/hidden.png" alt="" onClick={viewPass} />
                </div>
              </div>
              <button className='flex justify-center items-center gap-2 bg-purple-700 w-fit px-4 py-1 font-bold rounded-full border-2 border-purple-700 text-white hover:bg-purple-800 hover:cursor-pointer'
              onClick={savePass}>
                <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                style={{filter: "invert()"}}>
                </lord-icon>
                Save Password
              </button>
            </div>
            
            {(passArray.length === 0) && <div className='text-4xl text-white flex justify-center items-center font-bold mt-40'>NO PASSWORDS TO SHOW</div> }
            {(passArray.length !== 0) && (
            <div className="table w-full overflow-hidden border border-purple-700 rounded-lg">
              <table className="table-auto text-white w-full ">
                <thead>
                  <tr>
                    <th className='bg-purple-700 py-2'>URL</th>
                    <th className='bg-purple-700 py-2'>Username</th>
                    <th className='bg-purple-700 py-2'>Password</th>
                    <th className='bg-purple-700 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passArray.map((item, index)=> {
                    return <tr key={index}>
                    <td className='py-2 text-center'>
                      <div className='flex justify-center items-center md:gap-3'>
                        <span><a href='{item.site}' target='_blank'>{item.site}</a></span>
                        <div className='hover:cursor-pointer' onClick={()=>copyBtn(item.site)}>
                        <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{filter: "invert()", width:"25px", paddingTop:"1px"}}>
                        </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 text-center'>
                      <div className='flex justify-center items-center md:gap-3'>
                        <span>{item.username}</span>
                        <div className='hover:cursor-pointer' onClick={()=>copyBtn(item.username)}>
                        <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{filter: "invert()", width:"25px", paddingTop:"1px"}}>
                        </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 text-center'>
                      <div className='flex justify-center items-center md:gap-3'>
                        <span>{item.password}</span>
                        <div className='hover:cursor-pointer' onClick={()=>copyBtn(item.password)}>
                        <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{filter: "invert()", width:"25px", paddingTop:"1px"}}>
                        </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='flex justify-center items-center'>
                      <span className='mx-1 cursor-pointer' onClick={()=> handleEdit(item.id)}>
                        <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{filter: "invert()", width:"25px", paddingTop:"1px"}}>
                        </lord-icon>
                      </span>
                      <span className='mx-1 cursor-pointer' onClick={()=> handleDelete(item.id)}>
                        <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{filter: "invert()", width:"25px", paddingTop:"1px"}}>
                        </lord-icon>
                      </span>
                      </div>
                    </td>
                  </tr>
                  })}
                </tbody>
              </table>
            </div>)}
          </div>
    </div>
  )
}

export default Manager
