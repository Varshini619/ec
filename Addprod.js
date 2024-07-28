import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Addprod = () => {
    let [data,setData]=useState({"name":"","desc":"","price":"","cat":""})
    let navigate=useNavigate()
    let obj=useContext(Ct)
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let fun1=(e)=>{
        setData({...data,"pimg":e.target.files[0]})
    }
    let add=()=>{
        let fd=new FormData()
        for(let prop in data)
        {
            fd.append(prop,data[prop])
        }
        axios.post("http://localhost:5000/prod/add",fd,{"headers":{"Authorization":obj.cont.token,"_id":obj.cont._id}}).then((res)=>{
        console.log(res.data)    
        navigate("/")
        })

    }
  return (
    <div className='logincon'>
    <div className='login'>

        <input type='text' placeholder='enter name' name="name" onChange={fun} value={data.name}/>
        <input type='text' placeholder='enter price' name="price" onChange={fun} value={data.price}/>
        <input type='text' placeholder='enter desc' name='desc' onChange={fun} value={data.desc}/>
        <input type='text' placeholder='enter cat' name='cat' onChange={fun} value={data.cat}/>
        <input type='file' name="pimg" onChange={fun1}/>
                
        <button onClick={add}>Addprod</button>
    </div>

</div>
  )
}

export default Addprod