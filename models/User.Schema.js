const {Schema,model}=require("../database");


const UserSchema=new Schema({
    email:{type:String,require:true},
    password:{type:String,require:true}

},
{
    timestamps:true,
    versionKey:false
})

const UserModel=model("User",UserSchema)

module.exports=UserModel