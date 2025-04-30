import mongoose from "mongoose";

const schema=mongoose.Schema(
    {
        name:{type: String,required:true},
        email:{type:String,unique:true,required:true},
        password:{type:String,required:true},
        avatar :{type:String},
        age:{type:Number},
        bio: { type: String, default: "" },
        gender: { 
            type: String, 
            enum: ["Male", "Female", "Other"]
        },
        location: { type: String, default: "" },


        role: { type: String, enum: ['Student', 'Mentor', 'Other'], default:'Other',required: true },

        fieldOfExpertise:[{type:String}],
         
        userSkills:[{
            category:String,
            skill:[{type:String}]
        }],
        codingRanks: [{ 
            platform:String,
            rank:Number,
            profileLink:String
        }],
        codingLevel:{type:String,enum:['beginner','intermediate','advanced']},

        interests: [{ type: String }],  
        education: [{ 
            institution: { type: String},       //or institution
            degreeType: { type: String, enum: ["Bachelors", "Masters", "PhD","High School"],},
            course: { type: String },
            startYear:{type:Number},
            yearOfCompletion: { type: Number }
        }],
        // Only for Students
        currentCollegeYear:{type:Number},
        
        availability:{
            type:String,
            enum:['openToJoin','NotAvailaible']
        },
             
        socialLinks: {  
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
            Others:[{platform:String,link:String}]
        },
        createdAt:{type:Date , default:Date.now},
        updatedAt:{type:Date,default:Date.now},
        // authProvider: { type: String, enum: ["local", "google", "github"], required: true },
    },{timestamps:true}
);

const userModel=mongoose.model('users',schema);

export default userModel;

// //experience: [{ 
//     
// }],
              //can be massive eg lets say we have 10mprojects for one user
// reputation:[{rating:Number,feedback:String}],  
// skills: {
        //     technical :[{type:String}],
        //     design:[{type:String}],
        //     marketing:[{type:String}],
        //     finance:[{type:String}],
        //     coding:{
        //         level:{type:String, enum:['beginner','intermediate','advanced']},
        //         platforms:[{platform:String, rank:String}]
        //     },
        //     Others:[{type:String}]
        // },