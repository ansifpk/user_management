import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Form,Button } from "react-bootstrap";
import FormContiner from "../components/FormContiner";
import {toast} from 'react-toastify';
import Loader from '../components/Loding'
import { setCredentials } from "../slices/authSlices";
import { useUpdateUserMutation } from "../slices/userApiSlice";

import React from 'react'

const ProfileScreen = () => {
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

     const {userInfo} = useSelector((state)=>state.auth);
     const [updateUser,{isLoading}] = useUpdateUserMutation();
     useEffect(()=>{
      setName(userInfo.name)
      setEmail(userInfo.email)
      setImage(userInfo.image?.url)
     },[userInfo.name,userInfo.email,userInfo.image?.url]);



     const previewFile = async(e) =>{
      const file = e.target.files[0];
      setFileToBase(file);
    }
    const setFileToBase =(file)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        setImage(reader.result);
      }
    } 

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(/^[A-Za-z]+(?:[A-Za-z]+)?$/.test(name)){
          if(password!==confirmPassword){
            toast.error('Confirm password not match')
          }else{
           try {
              const res = await updateUser({
                  _id:userInfo._id,
                  name,
                  email,
                  password,
                  image
              }).unwrap();
              console.log(res,"res");
              dispatch(setCredentials({...res}));
              toast.success('Profile updated');
              navigate('/');
           } catch (err) {
              toast.error(err?.data?.message||err.error)
           }
          }
       
        }else{
          return toast.error('invalid name provided')
        }
    }
  return (
    <FormContiner>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler} encType="multipart/form-data"> 
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
                <Form.Control
                type="Password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm Email"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={previewFile}
                        
        ></Form.Control>
          <img src={image} height="200" alt="Image preview" />
        </Form.Group>
          {isLoading&&<Loader/>}
          <Button type="submit" variant="primary" className="mt-3">Update</Button>
        </Form>
    </FormContiner>
  )
}

export default ProfileScreen
