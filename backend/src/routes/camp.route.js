import express from 'express'
import { createCamp, getAllCamps, getNearbyCamps } from '../controllers/camp.controller.js';
const router=express.Router();

router.post('/',createCamp);
router.get('/nearby',getNearbyCamps);
router.get('/allcamps',getAllCamps);

router.get('/debug', async (req, res) => {
    const hardcodedCamp = {
        _id: "debug123",
        name: "Debug Camp",
        organization: "Debug Org",
        startDate: new Date(Date.now() + 86400000), // Tomorrow
        endDate: new Date(Date.now() + 172800000), // 2 days from now
        contact: "0000000000"
    };
    res.json({ success: true, data: [hardcodedCamp] });
});

export default router;
