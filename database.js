const  mongoose  = require("mongoose")

mongoose.connect('MongoDbURLComeHere...',()=>{
    console.log(`Hey! Your mongoDB connected`)
})

module.exports=mongoose
