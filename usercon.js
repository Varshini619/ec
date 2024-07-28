let bcrypt=require("bcrypt")
const usermodel = require("../models/usermodel")
let jwt=require("jsonwebtoken")
let fs=require("fs")
let reg=async(req,res)=>{
    try{
    let obj=await usermodel.findById({"_id":req.body._id})
    if(obj)
    {
        res.json({"msg":"account exists with given email"}) 
    }
    else{

    let hashcode=await bcrypt.hash(req.body.pwd,10)
    let data=new usermodel({...req.body,"pwd":hashcode})
    await data.save()
    res.json({"msg":"account created"})
    }
}
catch(err)
{
    console.log(err)
}
}
let login=async(req,res)=>{
    try{
        let obj=await usermodel.findById({"_id":req.body._id})
        if(obj)
        {
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f)
            {
                res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"_id":obj._id,"name":obj.name,"role":obj.role})
            }
            else
            {
                res.json({"msg":"check password"})
            }
        }
        else{
            res.json({"msg":"check email"})
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

let islogin=(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"abcd")
        next()

    }
    catch(err)
    {
        if(req.url=="/add")
        {
            fs.rm(`./pimgs/${req.file.filename}`,()=>{})
        }
        res.json({"err":"plz login"})

    }
}
let isadmin=async(req,res,next)=>{
    try{
     let obj=await usermodel.findById({"_id":req.headers._id})
     if(obj.role=="admin")
     {
        next()
     }
     else{
        if(req.url=="/add")
        {
            fs.rm(`./pimgs/${req.file.filename}`,()=>{})
        }
        res.json({"err":"you are not admin to add product"})
     }

    }
    catch(err)
    {

    }
}
module.exports={reg,login,islogin,isadmin}