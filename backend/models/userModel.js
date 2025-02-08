import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userScheema = mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
    type:String,
    required:true,
    unique:true
    },
    name:{
    type:String,
    required:true
    },
    password:{
    type:String,
    required:true
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    isAdmin:{
        type:Number,
    }
},{
    timestamps:true
});

userScheema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
userScheema.methods.matchPasswords = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) 
}
const User = mongoose.model('User',userScheema);

export default User