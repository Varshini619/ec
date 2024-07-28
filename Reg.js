import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
    let [data,setData]=useState({"_id":"","pwd":"","name":"","phno":""})
    let [err,setErr]=useState("")
    let navigate=useNavigate()
  
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let register=()=>{
        axios.post("http://localhost:5000/user/reg",data).then((res)=>{
            if(res.data.msg=="account created")
            {
                navigate("/login")
            }
            else{
                setErr(res.data.msg)
            }

        })
    }


  return (
    <div className='logincon'>
    <div className='login'>
        <div>{err}</div>
        <input type='text' placeholder='enter email' name="_id" onChange={fun} value={data._id}/>
        <input type='password' placeholder='enter password' name="pwd" onChange={fun} value={data.pwd}/>
        <input type='text' placeholder='enter name' name="name" onChange={fun} value={data.name}/>
        <input type='text' placeholder='enter phno' name="phno" onChange={fun} value={data.phno}/>
        <button onClick={register}>Register</button>
    </div>

</div>
  )
}

export default Reg