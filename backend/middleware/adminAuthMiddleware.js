import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const adminProtect = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRETE);
            req.user = await User.findById({_id:decoded.userId}).select('-password');
            if(req.user.isAdmin==1){
                next();
             }else{
                res.status(401);
                 throw new Error(`invalid token`)
             }  
        } catch (error) {
            res.status(401);
            throw new Error(`no authorized , no token`)
        }
    }
});

export default adminProtect