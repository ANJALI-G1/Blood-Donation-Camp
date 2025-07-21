import mongoose from 'mongoose';

const CampSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organization: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    location: { // GeoJSON for OpenCage
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationLink:{type:String},
    image: {
        url: { type: String, required: true }, // Cloudinary secure_url
        public_id: { type: String, required: true }, // For Cloudinary management
    },
    
}, { timestamps: true });

CampSchema.index({ location: '2dsphere' });

const Camp= mongoose.model('Camp', CampSchema);
export default Camp;