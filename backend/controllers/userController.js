import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import cloudinery from '../utils/cloudinery.js';

//desc auth user/set token
// route POST /api/users/auth
//acess public
const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    
    const user = await User.findOne({email:email});
    if(user&&(await user.matchPasswords(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          image:{
            public_id:user.image.public_id,
            url: user.image.url,
          },
        })
    }else{
        res.status(401)
        throw new Error("invaid email or password")
    }
    
})
//desc reg user
// route POST /api/users
//acess public
const registerUser = asyncHandler(async (req,res)=>{
   const {name,email,password,image} = req.body;
   const userCheck =await  User.findOne({email});
   if(userCheck){
     res.status(400)
     throw new Error("user already exists")
   }
  try {
    const result = await cloudinery.uploader.upload(image, {
        folder:'user'
    });
    const user = await User({
        name:name,
        email:email,
        password:password,
        isAdmin:0,
        image:{
            public_id:result.public_id,
            url: result.secure_url,
          },
     });
     await user.save();
     if(user){
      generateToken(res,user._id)
      res.status(201).json({
          _id:user._id,
          name:name,
          image:{
            url: result.secure_url,
          }
      })
     }else{
      res.status(400)
      throw new Error("invaid user data")
     }
  } catch (error) {
     console.error(error)
  }
})

//desc reg user
// route POST /api/users/logout
//acess public
const logoutUser = asyncHandler(async (req,res)=>{
   res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
   });
    res.status(200).json({message:"user logout"})
})
// desc reg user
// route POST /api/users/profile
//acess privet
const userProfile = asyncHandler(async (req,res)=>{
    
    
    const user = {
        _id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        image:req.user.image
    }
    res.status(200).json(user)
})
// desc update user profile
// route put /api/users/profile
//acess privet
const updateProfile = asyncHandler(async (req,res)=>{
     const user = await User.findById({_id:req.user._id});
     console.log(user,'user');
     
     const userCheck = await User.findOne({email:req.body.email})
     if(user){
        user.name = req.body.name || user.name;
           if(/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(req.body.email)){
            if(userCheck&&!user.email){
                res.status(401)
                throw new Error("this email already exists")
            }else{
            user.email = req.body.email || user.email;
            }
            }else{
                res.status(401)
                throw new Error("check email structure")
            }
            if(req.body.image?.url){
                user.image.url = req.body.image?.url || user.image.url;
            }
        if(req.body.password){
            if(req.body.password.trim().length<6){
                res.status(401)
                throw new Error("enter strong password")
            }
            user.password = req.body.password
        }
        const updateduser = await user.save();
        res.status(200).json({
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email,
            image:updateduser.image
        })
     }else{
       res.status(404);
       throw new Error(`user not found`);
     }
   
})
export {authUser,
    registerUser,
    logoutUser,
    userProfile,
    updateProfile
}