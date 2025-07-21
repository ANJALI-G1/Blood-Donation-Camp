import Camp from "../models/camp.model.js";
import { geocodeAddress } from "../utils/geocoder.js";

export const getAllCamp=async (req,res)=>{
    try {
        const {limit=20,page=1}=req.query;
        const skip=(page-1)*limit;

        const camps=await Camp.find({})
            .sort({startDate:-1})
            .skip(skip)
            .limit(parseInt(limit));


        res.json({
            success:true,
            count:camps.length,
            data:camps
        });

    } catch (error) {
        console.error("Error in getAllCamp of userCamp Controller");
        res.status(500).json({
            success:false,
            message:"Failed to fetch camps",
            error:error.message
        });
    }
};

export const searchCamps=async(req,res)=>{
    try {
        const {keyword , address ,startDate}=req.query;

        let query={};

        if(keyword){
            query.$or=[
                {name:{$regex:keyword,$options:'i'}},
                {organization:{$regex:keyword,$options:'i'}},
                {address:{$regex:keyword,$options:'i'}},
            ];
        }

        if(address){
            const {longitude,latitude}=await geocodeAddress(address);

            query.location={
                $near:{
                    $geometry:{
                        type:"Point",
                        coordinates:[longitude,latitude]
                    },
                    $maxDistance:50000
                }
            }
        }

        if(startDate){
            query.startDate={};
            query.startDate.$gte = new Date(startDate);
        }

        const camps=await Camp.find(query);

        
        res.json({
            success:true,
            count:camps.length,
            data:camps
        });
    } catch (error) {
        console.error("Error in searchCamp of userCamp Controller");
        res.status(500).json({
            success:false,
            message:"Failed to search camps",
            error:error.message
        });
    }
}