import mongoose from "mongoose";

const schema=mongoose.Schema({

    userid:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    title: String,
    description:String,
    techUsed:[{type:String}],
    role: String,
    duration: {
        start:{month:String,year:String},
        end:{month:String,year:String}
    },
    githubLink:String,
    websiteLink:String,
    type:[{
        type:String,
        // enum:['Personal','Open Source','Hackathon','Research Paper','Startups','Internship','Job']
    }]
});

const model=mongoose.model('user-projects',schema)

export default model;