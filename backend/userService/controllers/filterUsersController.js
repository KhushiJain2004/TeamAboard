import userModel from "../models/userModel.js";

export const filterUsers=async(req,res)=>{
    try {
        const query={}
        if (req.query.role) query.role = req.query.role;
        if (req.query.gender) query.gender = req.query.gender;
        if (req.query.location) query.location = req.query.location;
        if (req.query.currentCollegeYear) query.currentCollegeYear = Number(req.query.currentCollegeYear);
        if (req.query.availability) query.availability = req.query.availability;
        if (req.query.codingLevel) query.codingLevel = req.query.codingLevel;

        if (req.query.fieldOfExpertise) {
            query.fieldOfExpertise = {$in:req.query.fieldOfExpertise.split(',')};
        }
        if (req.query.interests) {
            query.interests = { $in: req.query.interests.split(',') };
        }
        if (req.query.skills) {
            query["userSkills.skill"] = {$in:req.query.skills.split(',')};

        }
        if (req.query.institution) query["education.institution"] = {$regex: req.query.institution,$options:"i"};
        if (req.query.degreeType) query["education.degreeType"] = {$regex: req.query.degreeType,$options:"i"};
        if (req.query.course) query["education.course"] = req.query.course;

        if (req.query.codingPlatform && req.query.minRank){
           query.codingRanks={
            $elemMatch:{
                platform:req.query.codingPlatform,
                rank:{$gte:Number(req.query.minRank)}
            }
           }
        }
        else if(req.query.codingPlatform){
            query['codingRanks.platform']={$in:req.query.codingPlatform.split(',')}
        }

        //sorting

        const sort={};
        if(req.query.sortBy){
            const order=req.query.order==='desc'?-1 :1;
            sort[req.query.sortBy] = order;
        }

        const users = await userModel.find(query).sort(sort).select(" name email bio");
        // const users = await userModel.find(query);

        return res.status(200).json({success:true,totalUsers:users.length,users});
        
    } catch (error) {
        // console.error("Error filtering users:", error);
        return res.status(500).json({ success:false,error:error.message});
    }
}

export const filterWithText=async(req,res)=>
{
    try {
        // console.log("hi")
        let queryObj={};
        let keywords=[];
        if(req.query.text)
        {
            keywords = req.query.text.split(/[\s,]+/).map(word => word.trim().replace(/[,'"_?]/g, "")).filter(word => word !== "");
            queryObj.$or=keywords.map(word=>({
                $or:[
                    {role:{$regex: word, $options:"i"}},
                    { "education.institution": { $regex: word, $options: "i" } },
                    { "education.degreeType": { $regex: word, $options: "i" } },
                    { "education.course": { $regex: word, $options: "i" } },
                
                    { interests: { $elemMatch: { $regex: word, $options: "i" } } }, // For arrays
                    { fieldOfExpertise: { $elemMatch: { $regex: word, $options: "i" } } }, 
                    { "userSkills.skill": { $elemMatch: { $regex: word, $options: "i" } } }, 
                    { "codingRanks.platform": { $elemMatch: { $regex: word, $options: "i" } } }, 
                    { location: { $regex: word, $options: "i" } },
                    { codingLevel: { $regex: word, $options: "i" } },
                    { availability: { $regex: word, $options: "i" } }
                ]
            }))
        }
        // console.log(keywords)
        const users=await userModel.find(queryObj).select("name email bio");
        return res.status(200).json({success:true,totalUsers:users.length,users});
    } catch (error) {
        return res.json({success:false,error:error.message});
    }
}
// export const filterWithText=async(req,res)=>
// {
//     try {
//         // console.log("hi")
//         let query={};
//         // let keywords=[];
//         if (req.query.text) {
//             const keywords = req.query.text.split(" ").map(word => new RegExp(word, "i"));

//             query.$or = [
//                 { role: { $in: keywords } },
//                 { "education.institution": { $in: keywords } },
//                 { "education.degreeType": { $in: keywords } },
//                 { "education.course": { $in: keywords } },
//                 { "fieldOfExpertise": { $in: keywords } },
//                 { "userSkills.skill": { $in: keywords } },
//                 { location: { $in: keywords } },
//                 { codingLevel: { $in: keywords } },
//                 { interests: { $in: keywords } },
//                 { availability: { $in: keywords } }
//             ]
//         }
//         console.log(query)
//         const users=await userModel.find(query).select("name email bio");
//         return res.status(200).json({success:true,totalUsers:users.length,users});
//     } catch (error) {
//         return res.json({success:false,error:error.message});
//     }
// }

// export const filterWithText = async (req, res) => {
//     try {
//         const queryObj = {}; // Search conditions

//         if (req.query.text) {
//             const keyword = req.query.text.trim(); // Keep full phrase

//             queryObj.$or = [
//                 { role: { $regex: keyword, $options: "i" } },
//                 { "education.institution": { $regex: keyword, $options: "i" } },
//                 { "education.degreeType": { $regex: keyword, $options: "i" } },
//                 { "education.course": { $regex: keyword, $options: "i" } },
//                 { interests: { $regex: keyword, $options: "i" } }, 
//                 { fieldOfExpertise: { $regex: keyword, $options: "i" } }, 
//                 { "userSkills.skill": { $regex: keyword, $options: "i" } }, 
//                 { "codingRanks.platform": { $regex: keyword, $options: "i" } }, 
//                 { location: { $regex: keyword, $options: "i" } },
//                 { codingLevel: { $regex: keyword, $options: "i" } },
//                 { availability: { $regex: keyword, $options: "i" } }
//             ];
//         }

//         // Fetch only users who match the full phrase
//         const users = await userModel.find(queryObj).select("name email bio ");

//         return res.status(200).json({
//             success: true,
//             totalUsers: users.length,
//             users
//         });

//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

