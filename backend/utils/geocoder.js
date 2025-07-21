import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const geocodeAddress = async (address) => {
    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.OPENCAGE_API_KEY}&no_annotations=1`
        );

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return {
                latitude: lat,
                longitude: lng,
                formattedAddress: response.data.results[0].formatted
            };
        }
        throw new Error('No results found');
    } catch (error) {
        console.error('Geocoding error:', error);
        throw new Error('Geocoding failed');
    }
};