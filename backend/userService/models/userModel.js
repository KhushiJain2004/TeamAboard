import mongoose from "mongoose";

const schema=mongoose.Schema(
    {
        name:{type: String,required:true},
        email:{type:String,unique:true,required:true},
        password:{type:String,required:true},
        avatar :{type:String},
        age:{type:Number},
        gender: { 
            type: String, 
            enum: ["Male", "Female", "Other"]
        },
        bio: { type: String, default: "" },
        skills: [{ type: String }], 
        interests: [{ type: String }],  
        location: { type: String, default: "" },
        education: { 
            college: { type: String},
            degree: { type: String },
            yearOfCompletion: { type: Number }
        },
        experience: [{ 
            company: String,
            role: String,
            duration: String
        }],
        projects: [{ 
            title: String,
            description:String,
            techUsed:[{type:String}],
            role: String,
            duration: String,
            link:String
        }],
        socialLinks: {  
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
            website: { type: String, default: "" }
        },
        createdAt:{type:Date , default:Date.now},
        updatedAt:{type:Date,default:Date.now},
        // authProvider: { type: String, enum: ["local", "google", "github"], required: true },
        posts: [{ type: String }],
    },{timestamps:true}
);

const userModel=mongoose.model('users',schema);

export default userModel;