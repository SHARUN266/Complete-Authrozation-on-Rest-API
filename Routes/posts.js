const express=require("express")
const app=express()
const checkAuth=require("../middleware/auth")
const PostModel=require("../models/posts.Schema")



app.use(express.json());


app.post('/post/new',checkAuth,(req,res)=>{
    const post=new PostModel({
        title:req.body.title,
        content:req.body.content
    })
    post.save().then((result)=>res.sendStatus(201)).catch((err)=>{ console.log(err) ;
    res.status(5500).json({error:err})
    } )

})

module.exports=app