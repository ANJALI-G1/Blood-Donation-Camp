import express from 'express'
import { createCamp, getNearbyCamps } from '../controllers/camp.controller.js';
const router=express.Router();

router.post('/',createCamp);
router.get('/nearby',getNearbyCamps);

export default router;
