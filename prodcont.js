let multer=require("multer")
let {v4:uuid4}=require("uuid")
let prodmodel=require("../models/prodmodel")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './pimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })

let add=async(req,res)=>{
    try{
        await new prodmodel({"_id":uuid4(),...req.body,"pimg":req.file.filename}).save()
        res.json({"msg":"prod added"})

    }
    catch(err)
    {
console.log(err)
    }
    


}

let getprod=async(req,res)=>{
    try{
        let data=await prodmodel.find()
        res.json(data)

    }
    catch(err)
    {

    }
}
let addfb=async(req,res)=>{
  try{
  await  prodmodel.findByIdAndUpdate({"_id":req.body._id},{$push:{"com":req.body}})
  res.json({"msg":"com added"})
  }
  catch(err)
  {

  }
}
module.exports={add,upload,getprod,addfb}
