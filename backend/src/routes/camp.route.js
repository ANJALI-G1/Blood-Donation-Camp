import express from 'express'
import { createCamp, getAllCamps, getNearbyCamps, searchCamps } from '../controllers/camp.controller.js';
const router=express.Router();

router.post('/',createCamp);
router.get('/nearby',getNearbyCamps);
router.get('/allcamps',getAllCamps);
router.get('/search',searchCamps)



export default router;
