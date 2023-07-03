const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product name"],
        trim:true
    },
    description:{
        type:String,    
        required:[true,"Please Enter Product description"]
        
    },
    price:{
        type:Number,
        required:[true,"Please Enter Price"],
        maxLength:[10,"Price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],

    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                requird:true,
            },
            Comment:{
                type:String,
                requird:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema);