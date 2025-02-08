import express from 'express'
const router = express.Router();
import {
    authAdmin,
    editUser,
    userList,
    userProfile,
    deleteUser,
    createUser,
} from '../controllers/adminController.js';
import  adminProtect from '../middleware/adminAuthMiddleware.js';

router.post('/login', authAdmin);
router.get('/usersList', userList);
router.route('/userEdit').get(adminProtect,userProfile).put(adminProtect,editUser)
router.post('/deleteUser',deleteUser)
router.post('/createUser',createUser)


export default router