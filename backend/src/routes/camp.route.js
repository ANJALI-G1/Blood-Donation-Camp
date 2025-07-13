import express from 'express'
import { createCamp, getAllCamps, getNearbyCamps } from '../controllers/camp.controller.js';
const router=express.Router();

router.post('/',createCamp);
router.get('/nearby',getNearbyCamps);
router.get('/allcamps',getAllCamps);



export default router;
