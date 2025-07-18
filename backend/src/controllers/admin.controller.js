import express from 'express'
import mongoose from 'mongoose';
import cloudinary from '../../utils/cloudinary.js';
import Camp from '../model/camp.model.js';

//trying to add camp from frontend
// In admin.controller.js
export const addCampFront = async (req, res) => {
    try {
        if (!req.files?.image) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: 'blood-donation-camps'
        });

        // Create camp document
        const camp = new Camp({
            name: req.body.name,
            organization: req.body.organization,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            registrationLink: req.body.registrationLink,
            contact: req.body.contact,
            location: {
                type: "Point",
                coordinates: [
                    parseFloat(req.body.longitude),
                    parseFloat(req.body.latitude)
                ],
            },
            imageUrl: result.secure_url,
        });

        const savedCamp = await camp.save();

        return res.status(201).json({
            success: true,
            message: "Camp created successfully",
            data: savedCamp
        });

    } catch (error) {
        console.error("Error in addCampFront:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}