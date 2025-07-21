import axios from 'axios';

const api = axios.create({
    baseURL: 'https://blood-donation-camp.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;