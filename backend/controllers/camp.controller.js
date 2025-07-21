import cloudinary from "../config/cloudinary.js";
import Camp from "../models/camp.model.js";
import { geocodeAddress } from "../utils/geocoder.js";
import mongoose from "mongoose";

export const createCamp = async (req, res) => {
    try {
        // 1. Handle image upload
        let imageData = {};
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'camps' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });
            
            imageData = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        // 2. Convert address to coordinates
        const { longitude, latitude } = await geocodeAddress(req.body.address);

        // 3. Create camp
        const camp = await Camp.create({
            name: req.body.name,
            organization: req.body.organization,
            contact: req.body.contact,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],
            },
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            registrationLink: req.body.registrationLink,
            image: imageData
        });

        res.status(201).json({
            success: true,
            data: camp
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const updateCamp = async (req, res) => {
    try {
        const camp = await Camp.findById(req.params.id);
        if (!camp) return res.status(404).json({ error: 'Camp not found' });

        // Handle image update
        if (req.file) {
            // Delete old image from Cloudinary
            if (camp.image?.public_id) {
                await cloudinary.uploader.destroy(camp.image.public_id);
            }
            
            // Upload new image
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'camps' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });
            
            camp.image = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        // Update other fields
        const updatableFields = ['name', 'organization', 'contact', 'address', 
                               'startDate', 'endDate', 'registrationLink'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                camp[field] = req.body[field];
            }
        });

        // If address changed, update coordinates
        if (req.body.address && req.body.address !== camp.address) {
            const { longitude, latitude } = await geocodeAddress(req.body.address);
            camp.location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        }

        await camp.save();
        res.json({ success: true, data: camp });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const deleteCamp = async (req, res) => {
    try {
        const camp = await Camp.findById(req.params.id);
        if (!camp) {
            return res.status(404).json({
                success: false,
                message: "Camp not found"
            });
        }

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(camp.image.public_id);

        // Delete from database
        await Camp.deleteOne({ _id: req.params.id });

        res.json({
            success: true,
            message: "Camp deleted"
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


export const getAllCampsAdmin = async (req, res) => {
    try {
        // Add pagination if needed: ?page=1&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const camps = await Camp.find()
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);

        const total = await Camp.countDocuments();

        res.json({
            success: true,
            data: camps,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching camps:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch camps'
        });
    }
};