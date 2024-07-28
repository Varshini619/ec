let express=require("express")
let mongoose=require("mongoose")
const route = require("./routes/userroute")
const prodroute = require("./routes/prodroutes")
var bodyParser = require('body-parser')
let cors=require("cors")
const cartroute = require("./routes/cartroutes")


let app=express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/imgs",express.static("./pimgs"))
mongoose.connect("mongodb://127.0.0.1:27017/fsd2ecomdb1").then(()=>{
    console.log("ok")
})

app.use("/user",route)
app.use("/prod",prodroute)
app.use("/cart",cartroute)

app.listen(5000)
