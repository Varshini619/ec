import React, { useContext, useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Ct from './Ct'
import  axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Detcom = () => {
    let obj=useContext(Ct)
    let item=obj.cont.item
    let navigate=useNavigate()
    const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  let [data,setData]=useState("")
  let addfed=()=>{
    let fb={"name":obj.cont.name,"_id":item._id,"desc":data,"rt":value}
   axios.put("http://localhost:5000/prod/addcom",fb,{"headers":{"authorization":obj.cont.token}}).then(()=>{
    setData("")
    setValue(2)
    navigate("/")

   })
  }
  return (
    <div className='prod'>
            <div className='img'>
              <img src={`http://localhost:5000/imgs/${item.pimg}`}/>
            </div>
            <p>Name:{item.name}</p>
            <p>Desc:{item.desc}</p>
            <p>Cat:{item.cat}</p>
            <p>Price:<b>{item.price}</b></p>
            <div>
                {
                    item.com.map((coment)=>{
                        return(<div>
                            <h1>Name:{coment.name}</h1>
                            <p>{coment.desc}</p>
                            <Rating name="read-only" value={coment.rt} readOnly />

                        </div>)
                    })
                }
            </div>
            <button onClick={()=>obj.cont.add(item)}>Addcart</button>


            <div>
                <textarea value={data} onChange={(e)=>setData(e.target.value)}></textarea>

                <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
     
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <button onClick={addfed}>submit feedback</button>

            </div>
            
          </div>
  )
}

export default Detcom