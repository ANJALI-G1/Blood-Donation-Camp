import express from 'express'
import { addCampFront } from '../controllers/admin.controller.js';

const router=express.Router();

router.post('/add',addCampFront);


export default router;
