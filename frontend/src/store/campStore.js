import {create} from 'zustand'
import axios from 'axios';

const useCampStore=create((set)=>({
    camps:[],
    loading:false,
    error:null,

    fetchNearbyCamps:async({place,lat,lng})=>{
        set({loading:true,error:null});
        try {
            const res=await axios.get('/api/camps/nearby',{
                params:{place,lat,lng}
            });
            set({camps:res.data.data || [],loading:false});
        } catch (error) {
            console.error("error in fetchNearbyCamps of campStore")
        }
    },

    addCamp:async(campData)=>{
        set({loading:true});
        try {
            const res=await axios.post('/api/camps',campData);
            set((state)=>({camps:[...state.camps,res.data.data],loading:false}))
            console.log("data of added camp",res.data.data);
            return res.data.data;
        } catch (error) {
            console.error("error in addCamp of campStore",error)
            set({error:error.response?.data?.error || "Failed to add camp",loading:false});
        }
    },

//     fetchAllCamps: async () => {
//     set({ loading: true, error: null });
//     try {
//         const res = await axios.get('/api/camps/allcamps');
        
//         // Enhanced debugging
//         console.group('API Response Analysis');
//         console.log('Full response:', res);
//         console.log('Response data structure:', {
//             exists: !!res.data,
//             isArray: Array.isArray(res.data),
//             hasDataProp: !!res.data.data,
//             dataPropIsArray: Array.isArray(res.data?.data)
//         });
//         console.groupEnd();
        
//         // Handle all possible response structures
//         const campsData = Array.isArray(res.data?.data) 
//             ? res.data.data 
//             : Array.isArray(res.data) 
//                 ? res.data 
//                 : [];
        
//         console.log('Processed camps data:', campsData);
//         set({ camps: campsData, loading: false });
//     } catch (error) {
//         console.error("Fetch error details:", {
//             error: error,
//             response: error.response,
//             message: error.message
//         });
//         set({ 
//             error: error.response?.data?.error || "Failed to fetch camps",
//             loading: false 
//         });
//     }
// },

   
    fetchAllCamps: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('/api/camps/allcamps');
            
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