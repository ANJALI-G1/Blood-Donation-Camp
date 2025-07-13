import { create } from 'zustand'
import axios from 'axios';

const useCampStore = create((set) => ({
    camps: [],
    loading: false,
    error: null,

    fetchNearbyCamps: async ({ place, lat, lng }) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('/api/camps/nearby', {
                params: { place, lat, lng }
            });
            set({ camps: res.data.data || [], loading: false });
        } catch (error) {
            console.error("error in fetchNearbyCamps of campStore");
            set({
                error: error.response?.data?.error || "Failed to fetch camps",
                loading: false
            });
        }
    },

    addCamp: async (campData) => {
        set({ loading: true });
        try {
            const res = await axios.post('/api/camps', campData);
            set((state) => ({ camps: [...state.camps, res.data.data], loading: false }))
            console.log("data of added camp", res.data.data);
            return res.data.data;
        } catch (error) {
            console.error("error in addCamp of campStore", error)
            set({ error: error.response?.data?.error || "Failed to add camp", loading: false });
        }
    },



    fetchAllCamps: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/camps/allcamps');

            console.log('API Response:', res.data); // Debug log

            // Handle response data properly
            const campsData = res.data?.data || [];

            if (!Array.isArray(campsData)) {
                throw new Error('Invalid data format received');
            }

            set({ camps: campsData, loading: false });
            return campsData;
        } catch (error) {
            console.error('Fetch error:', {
                message: error.message,
                response: error.response?.data
            });
            set({
                error: error.response?.data?.error || error.message,
                loading: false
            });
            return [];
        }
    },

}));

export default useCampStore;