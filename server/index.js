const express = require("express")
const app = express()
require('dotenv').config()
const connectDB = require("./Config/connectDB")

connectDB()

app.use(express.json())

const userRoute = require("./Routes/userRoute")
app.use("/users", userRoute)

app.listen(process.env.port, (err)=>{
    err? console.error(err): console.log("server is running on 5000")
})