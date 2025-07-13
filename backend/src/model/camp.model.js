import mongoose from 'mongoose'

const campSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: function () {
            return this.startDate;
        },
        validate: {
            validator: function (v) {
                return v >= this.startDate;
            },
            message: "End date must be after start date"
        }
    },
    contact: {
        type: String,
        required: true,
    },
    registrationLink: {
        type: String,
        required: true,
    }
});

campSchema.index({ location: '2dsphere' }); //Geospatial index

const Camp = mongoose.model('Camp', campSchema);
export default Camp;
