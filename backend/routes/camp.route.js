import express from 'express';
import { createCamp, updateCamp, deleteCamp, getAllCampsAdmin } from '../controllers/camp.controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), createCamp);
router.put('/:id', upload.single('image'), updateCamp);
router.delete('/:id', deleteCamp);
router.get('/admin', getAllCampsAdmin);

export default router;