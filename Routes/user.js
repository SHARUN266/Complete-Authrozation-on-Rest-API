const express = require("express");
const userApp = express();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.Schema");
const checkAuth=require("../middleware/auth")
userApp.use(express.json());
const jwt=require("jsonwebtoken");
const secret="$%#@###$%$RWER#$R#@#@#WWEWQWWDSSDFWR#$%%^&^%^"
userApp.post("/registration", (req, res) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "email already taken",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.sendStatus(500).json({
              error: err,
            });
          } else {
            const user = new UserModel({
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((results) => res.sendStatus(201))
              .catch((err) => res.status(500).json({ error: err }));
          }
        });
      }
    });
});
// Delete user
userApp.delete("/delete/:id",checkAuth,(req,res)=>{
    UserModel.findByIdAndDelete({_id:req.params.id}).exec().then((response)=>{
        res.status(200).json({message:"User deleted!"})
    }).catch((err)=>{
        res.status(500).json({error:err})
    })
})
// Login in---->
userApp.post("/login",(req,res)=>{
        UserModel.find({email:req.body.email}).exec().then((results)=>{
            if(results.length<1){
                return res.sendStatus(401)
            }

            bcrypt.compare(req.body.password,results[0].password,(err,isEqual)=>{
                   if(err){
                    return res.sendStatus(401)

                   }
                   if(isEqual){
                      const token=jwt.sign({
                        email:results[0].email,
                        userId:results[0]._id
                      },
                      
                      secret,
                      {
                        expiresIn:"1h"
                      }
                      )
                     return res.status(200).json({
                        message:"Authorization successful",
                        token:token
                     })
                   }
                   res.sendStatus(401)
            })
        }).catch((err)=>{
            console.log(err)
            res.sendStatus(500).json("Error")
        })
})
module.exports = userApp;
