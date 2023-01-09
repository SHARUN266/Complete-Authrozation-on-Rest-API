const  mongoose  = require("mongoose")

mongoose.connect('mongodb+srv://sharun:123@atlascluster.qwa1fxi.mongodb.net/AuthRest?retryWrites=true&w=majority',()=>{
    console.log(`Hey! Your mongoDB connected`)
})

module.exports=mongoose