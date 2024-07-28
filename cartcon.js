let {v4:uuid4}=require("uuid")
const cartmodel = require("../models/cartmodel")
let add=async(req,res)=>{
    try{
        let obj=await cartmodel.find({"uid":req.body.uid,"pid":req.body._id})
        if(obj.length>0)
        {
          await  cartmodel.findByIdAndUpdate({"_id":obj[0]._id},{"qty":obj[0].qty+1})
          res.json({"msg":"updated qty"})

        }
        else{
    let tid=uuid4()
    await new cartmodel({...req.body,"_id":tid,"pid":req.body._id}).save()
    res.json({"msg":"prod add"})
        }
    }
    catch(err)
    {

    }

}
let getcart=async(req,res)=>{
    try{
    let data=await cartmodel.find({"uid":req.params.uid})
    res.json(data)
    }
    catch(err)
    {

    }
}

let inc=async(req,res)=>{
    try{

   await cartmodel.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":1}})
   res.json({"msg":"inc done"})
    }
    catch(err)
    {

    }
}
let dec=async(req,res)=>{
    try{
        let obj=await cartmodel.findById({"_id":req.body._id})
    if(obj.qty>1)
    {

   await cartmodel.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":-1}})
    }
    else{
        await cartmodel.findByIdAndDelete({"_id":req.body._id})
    }
    res.json({"msg":"dec done"})
}
    catch(err)
    {
        
    }
}
let delcartprod=async(req,res)=>{
    try{
        await cartmodel.findByIdAndDelete({"_id":req.params._id})
        res.json({"msg":"del done"})
    }
    catch(err)
    {

    }

}
let clearcart=async(req,res)=>{
    try{
        await cartmodel.deleteMany({"uid":req.params.uid})
        res.json({"msg":"del done"})
    }
    catch(err)
    {

    }


}
module.exports={add,getcart,inc,dec,delcartprod,clearcart}