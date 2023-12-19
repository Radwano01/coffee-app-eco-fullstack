const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
require("dotenv").config()
app.use(express.json());

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("YOUR SERVER RUNNING AT:", PORT)
})

const ordersRoute = require("./routes/ordersRoute.js").route;

app.use("/orders", ordersRoute)