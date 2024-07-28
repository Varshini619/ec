import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import {Link, useNavigate} from "react-router-dom"
const Home = () => {
  let [prod,setProd]=useState([])
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:5000/prod/get").then((res)=>{
      setProd(res.data)
    })

  },[])
  let add=(item)=>{
    if(obj.cont.token=="")
    {
      navigate("/login")
    }
    else{

      axios.post("http://localhost:5000/cart/add",{...item,"qty":1,"uid":obj.cont._id},{"headers":{"Authorization":obj.cont.token}}).then(()=>{
        navigate("/cart")
      })

    }


  }
  return (
    <div className='con'>
      {
        prod.map((item)=>{
          return(<div className='prod'>
            <div className='img'>
              <img src={`http://localhost:5000/imgs/${item.pimg}`}/>
            </div>
            <p>Name:{item.name}</p>
            <p>Desc:{item.desc}</p>
            <p>Cat:{item.cat}</p>
            <p>Price:<b>{item.price}</b></p>
            <button onClick={()=>add(item)}>Addcart</button>
            <button onClick={()=>obj.updcont({"item":item,"add":add})}> <Link to="/det">Know more...</Link></button>

          </div>)
        })
      }

    </div>
  )
}

export default Home