import mongoose from "mongoose";
import axios from 'axios'
import Camp from "../model/camp.model.js";

//to add a new camp
export const createCamp=async(req,res)=>{
    try {
        const camp=new Camp(req.body);
        await camp.save();
        res.status(201).json({success:true,data:camp});
    } catch (error) {
        console.error("Error in create camp controller",error);
        res.status(400).json({success:false,error:error.message});
    }
};

//using openCage to get near by location

export const getNearbyCamps=async(req,res)=>{
    const {place,lat,lng}=req.query;

    try {
        
        let coordinates=[parseFloat(lng),parseFloat(lat)];


        //only name of place is given
        if(place && !lat && !lng){
            const geocodesRes=await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${process.env.OPENCAGE_API_KEY}`);

            coordinates=[
                geocodesRes.data.results[0].geometry.lng,
                geocodesRes.data.results[0].geometry.lat
            ]
        }

        const currDate=new Date();

        const camps=await Camp.find({
            location:{
                $near:{
                    $geometry:{
                        type:"Point",
                        coordinates,
                        $maxDistance:50000
                    }
                }
            },
        endDate:{$gte:currDate} //for upcoming camps
        }).sort({startDate:1});

        res.json({
            success:true,
            data:camps||[]
        });
    } catch (error) {
        console.error("Error in getNearbyCamps controller");
        res.status(500).json({success:false,error:error.message});
    }
};


export const getAllCamps=async(req,res)=>{
    const currDate=new Date();
    try {
        const camps=await Camp.find({
            endDate:{$gte:currDate}
        }).sort({startDate:1});
        res.json({
            success:true
            ,data:camps||[]
        });
    } catch (error) {
        console.error("Error in getAllCamps router");
        res.status(500).json({
            success:false,
            error:error.message});
    }
};