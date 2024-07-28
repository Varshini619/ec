let express=require("express")
const { login, reg } = require("../controlers/usercon")
let route=new express.Router()
route.post("/login",login)
route.post("/reg",reg)
module.exports=route