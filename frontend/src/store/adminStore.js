import { create } from 'zustand';
import axios from 'axios';

export const useAdminStore = create((set) => ({
    camps: [],
    addCampAdmin: async (formData) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/admin/add', // Must match your backend route
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Refresh camps list after successful addition
            const campsResponse = await axios.get('http://localhost:5000/api/camps/allcamps');
            set({ camps: campsResponse.data });

            return response.data; // Return the full response

        } catch (error) {
            console.error("Error adding camp:", error.response?.data || error.message);
            throw error.response?.data || {
                success: false,
                message: "Failed to add camp"
            };
        }
    },
    fetchAllCampsAdmin: async () => {
        try {
            const response = await axios.get('/api/camps/allcamps');
            set({ camps: response.data });
        } catch (error) {
            console.error("Error fetching camps:", error);
            throw error;
        }
    }
}));

