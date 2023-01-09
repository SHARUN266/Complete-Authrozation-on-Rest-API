const {Schema,model}=require("../database");


const PostSchema=new Schema({
    title:{type:String,require:true},
    content:{type:String,require:true}

},
{
    timestamps:true,
    versionKey:false
})

const PostModel=model("post",PostSchema)

module.exports=PostModel