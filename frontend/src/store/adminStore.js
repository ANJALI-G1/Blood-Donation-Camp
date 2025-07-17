import { create } from "zustand";
import axios from 'axios';

export const useAdminStore = create((set) => ({
    camps: [],
    loading: false,
    error: null,

    fetchAllCampsAdmin: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('/api/camps/allcamps');
            set({ loading: false, camps: res.data.data });
        } catch (error) {
            console.error("Error in fetchAllCampsAdmin of adminStore.js");
            set({
                error: error.response?.data?.error || 'Failed to fetch camps',
                loading: false,
            });
        }
    },

    addCampAdmin: async (campData) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post('http://localhost:5000/api/admin/add', campData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            set((state) => ({
                loading: false,
                camps: [...state.camps, res.data.data],
            }));
            
            console.log(res.data.data);
             return res.data;
        } catch (error) {
            console.error("Error in addCampAdmin of adminStore.js");
            set({
                error: error.response?.data?.error || 'Failed to fetch camps',
                loading: false,
            });
            throw error;
        }
    }


}));