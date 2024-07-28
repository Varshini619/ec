import axios from 'axios'
import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let [data,setData]=useState({"_id":"","pwd":""})
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let obj=useContext(Ct)
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let login=()=>{
        axios.post("http://localhost:5000/user/login",data).then((res)=>{
            if(res.data.token)
            {
                obj.updcont(res.data)
                navigate("/")

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
            <button onClick={login}>Login</button>
        </div>

    </div>
  )
}

export default Login