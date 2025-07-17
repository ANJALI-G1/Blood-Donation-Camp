import express from 'express'
import mongoose from 'mongoose';
import cloudinary from '../../utils/cloudinary.js';
import Camp from '../model/camp.model.js';

//trying to add camp from frontend

export const addCampFront = async (req, res) => {
    try {
        const imageFile = req.files.image;
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath);

        const camp = new Camp({
            name: req.body.name,
            organization: req.body.organization,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            registrationLink: req.body.registrationLink,
            contact: req.body.contact,
            location: {
                type: "Point",
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
            },
            imageUrl: result.secure_url,
        });

        await camp.save();
        console.log("Cloudinary Image URL:", result.secure_url);
        res.status(201).json(camp);
    } catch (error) {
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);
        console.error("error in addCampFront controller", error)
        res.status(500).json({ error: "Failed to create camp" });

    }
}