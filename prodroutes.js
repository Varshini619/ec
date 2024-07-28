let express=require("express")
const { add,upload, getprod, addfb } = require("../controlers/prodcont")
let {islogin, isadmin}=require("../controlers/usercon")

let prodroute=new express.Router()
prodroute.post("/add",upload.single("pimg"),islogin,isadmin,add)
prodroute.get("/get",getprod)
prodroute.put("/addcom",islogin,addfb)
module.exports=prodroute