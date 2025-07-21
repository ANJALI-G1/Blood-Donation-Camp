import express from 'express'
import { getAllCamp, searchCamps } from '../controllers/userCamp.controller.js';

const router =express.Router();

router.get('/getCamps',getAllCamp);
router.get('/search',searchCamps);

export default router;