import { create } from "zustand";
import axios from 'axios';

const useCampStore=create((set)=>({
    camps:[],
    loading:false,
    error:null,

    fetchCamps:async()=>{
        set({loading:true,error:null});
        try {
            const res=await axios.get('http://localhost:5000/api/user/camps/getCamps');

            console.log('Api ressponse of fetchCamps',res.data);

            set({loading:false,camps:res.data.data || res.data });

        } catch (error) {
            console.log("Error in fetch camps of User");
            set({
                error:error.message,
                loading: false
            });
        }
    },

    campSearch:async({keyword,address,startDate})=>{
        set({loading:true,error:null});
        try {
            const res=await axios.get('http://localhost:5000/api/user/camps/search',{
                params:{keyword,address,startDate}
            });
            set({loading:false,camps:res.data.data || res.data });
        } catch (error) {
            console.error("error in campSearch of campStore", error);
            set({
                error:error.message,
                loading: false
            });
        }
    }
}));
export default useCampStore;