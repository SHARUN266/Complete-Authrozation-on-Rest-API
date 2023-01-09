const express=require("express")
const app=express()
const PORT=process.env.PORT||9500;
const router=require("./Routes/posts")
const User=require("./Routes/user")
app.use("/user",User)
app.use("/",router)
app.listen(PORT,()=>{
    console.log(`Your server start at ${PORT}`)
})

app.get("/test",(req,res)=>{
    res.sendStatus(200)
})

