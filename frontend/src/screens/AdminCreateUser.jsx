import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Form,Button,Row,Col } from "react-bootstrap";
import FormContiner from "../components/FormContiner";
import {toast} from 'react-toastify';
import Loader from '../components/Loding'
import { useCreateUserMutation } from "../slices/adminApiSlice";


import React from 'react'


const AdminCreateUser = () => {
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [createUser,{isLoading}]=useCreateUserMutation()
    const navigate = useNavigate();

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
          if(/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email)){
            if(password.trim().length==0){
              return toast.error(`Enter Password`)
            }else if(password.trim().length<6){
              return toast.error(`Enter a Strong Password`)
            }else if(password.trim()!==confirmPassword.trim()){
              return toast.error(`Cnfirm Password not Match`)
            }else{
              try {
               
                
                   const res = await createUser({name,email,password,image}).unwrap();
                   if(res){
                    setEmail("");
                    setName("");
                   setPassword("");
                   setImage("");
                   setConfirmPassword("");
                   toast.success(`User Created`)
                    navigate('/admin/usersList') 
                   }
    
              } catch (err) {
                console.log("err");
                toast.error(err?.data?.message||err.message);
              }
            }
          }else{
            
            return toast.error(`Invalid Email Structure`)
          }
        }else{
          
          return toast.error(`Invalid Name`)
        }
    }
   
  return (
    <FormContiner>
        <h1>Create User</h1>
        <Form  encType="multipart/form-data" onSubmit={submitHandler}> 
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
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
                <Form.Control
                type="Password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                name="confirmPassword"
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
                    {image && <img src={image} height="200" alt="Image preview" />}
            </Form.Group>
           {isLoading&&<Loader/>}
          <Button type="submit" variant="primary"  className="mt-3">Create</Button>
        </Form>
    </FormContiner>
  )
}

export default AdminCreateUser
