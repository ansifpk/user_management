import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import cloudinery from '../utils/cloudinery.js';

const authAdmin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email});
    if(user&&(await user.matchPasswords(password))){
       if(user.isAdmin==1){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id, 
            name:user.name,
          email:user.email,
          password:user.password,
          isAdmin:user.isAdmin
        })
       }else{
        res.status(401)
        throw new Error("You are not admin")
       }
    }else{
        res.status(401)
        throw new Error("invaid email or password")
    }
});
const userList = asyncHandler(async(req,res)=>{
    const data = await User.find({isAdmin:0});
    if(data.length==0){
        res.status(200).json(undefined);
    }else{
    res.status(200).json(data);
    }
})
const createUser = asyncHandler(async(req,res)=>{
    const {name,email,password,image} = req.body;
    
    
    const userCheck =await  User.findOne({email});
    if(userCheck){
        res.status(401);
        throw new Error("this Email already exists");
    }else{
       try {
        const result = await cloudinery.uploader.upload(image, {
            folder:'user'
        })
       
        const user = await User({
            name:name,
            email:email,
            password:password,
            image:{
              public_id:result.public_id,
              url: result.secure_url,
            },
            isAdmin:0
         });
        const data =  await user.save();
         res.status(200).json(
            data
        )
       } catch (error) {
          console.error(error);
          
       }
        
       
    }
});
const userProfile = asyncHandler(async(req,res)=>{
    const data = await User.find()
    res.status(200).json(data)
})
const editUser = asyncHandler(async(req,res)=>{
   const user = await User.findById({_id:req.body.userId})
    if(/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(req.body.email)){
        const checkUser = await User.findOne({email:req.body.email});
        if(checkUser&&!user.email){
            res.status(401);
            throw new Error("this Email already exists");
        }else{
            if(/^[A-Za-z]+(?:[A-Za-z]+)?$/.test(req.body.name)){
                user.email = req.body.email || user.email;
                user.name = req.body.name || user.name;
                if(req.body.image){
                    user.image ={
                        ...user.image,
                        url:req.body.image
                    }
                } 
                const updateduser = await user.save();
                res.status(200).json({
                    _id:updateduser._id,
                    name:updateduser.name,
                    email:updateduser.email
                })
            }else{
                res.status(401);
                throw new Error("Invalid Name Provide");
            }
        }
        
    }else{
        res.status(401);
        throw new Error("check email structure");
    }
});
const deleteUser = asyncHandler(async(req,res)=>{
    try {
        const updateduser =  await User.findByIdAndDelete({_id:req.body.id});
         
        res.status(200).json(
            updateduser
        )
    } catch (error) {
        console.error(error)
    }
})
export {
    authAdmin,
    editUser,
    userProfile,
    userList,
    createUser,
    deleteUser,
}