import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import {useNavigate} from 'react-router-dom'
const Cart = () => {
  let [cart,setCart]=useState([])
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let fetchcart=()=>{
   
    axios.get(`http://localhost:5000/cart/get/${obj.cont._id}`,{"headers":{"Authorization":obj.cont.token}}).then((res)=>{
      setCart(res.data)
    })
  }
  useEffect(()=>{
    if(obj.cont.token=="")
    {
navigate("/login")
    }
    else{
    fetchcart()
    }

  },[])
  let inc=(_id)=>{
    axios.put("http://localhost:5000/cart/inc",{"_id":_id},{"headers":{"Authorization":obj.cont.token}}).then(()=>{
      fetchcart()
    })
  }
  let dec=(_id)=>{
    axios.put("http://localhost:5000/cart/dec",{"_id":_id},{"headers":{"Authorization":obj.cont.token}}).then(()=>{
      fetchcart()
    })
  }

  let del=(_id)=>{
    axios.delete(`http://localhost:5000/cart/delete/${_id}`,{"headers":{"Authorization":obj.cont.token}}).then(()=>{
      fetchcart()
    })
  }
  let clr=()=>{
    axios.delete(`http://localhost:5000/cart/clear/${obj.cont._id}`,{"headers":{"Authorization":obj.cont.token}}).then(()=>{
      fetchcart()
    })
  }
  return (<>
  {cart.length==0&&<div>Your cart is empty</div>}
   {cart.length>0&& <div className='con'>
      {
        cart.map((item)=>{
          return(<div className='prod'>
            <div className='img'>
              <img src={`http://localhost:5000/imgs/${item.pimg}`}/>
            </div>
            <p>Name:{item.name}</p>
            <p>Desc:{item.desc}</p>
            <p>Cat:{item.cat}</p>
            <p>Price:<b>{item.price}</b></p>
            <p><button onClick={()=>dec(item._id)}>-</button>{item.qty}<button onClick={()=>inc(item._id)}>+</button></p>
            <button onClick={()=>del(item._id)}>Delcart</button>

          </div>)
        })
}
<button onClick={clr}>clearcart</button>

    </div>}
  </>)
}

export default Cart