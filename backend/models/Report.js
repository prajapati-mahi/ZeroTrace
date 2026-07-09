const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    title:{
        type:String,
        default:"",
    },

    text:{
        type:String,
        default:"",
    },

    plagiarismScore:{
        type:Number,
        default:0,
    },

    aiScore:{
        type:Number,
        default:0,
    },

    risk:{
        type:String,
        default:"LOW",
    },

    matches:[
        {
            title:String,
            link:String,
            score:Number,
        },
    ],
},
{
    timestamps:true,
}
);

module.exports = mongoose.model(
  "Report",
  reportSchema
);