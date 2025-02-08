import express from 'express'
const router = express.Router();
import {authUser,
    registerUser,
    logoutUser,
    userProfile,
    updateProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser)
router.route('/profile').get(protect,userProfile).put(protect,updateProfile);



export default router