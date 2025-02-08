import React, { useEffect, useState } from 'react'
import FormContiner from '../components/FormContiner'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUsersMutation } from '../slices/adminApiSlice';
import { useEditUserMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';


const EditUser = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [image,setImage] = useState("")
    const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const navigate = useNavigate();
  const [users, { data}] = useUsersMutation();
  const [editUser] = useEditUserMutation();
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const  data  = await users().unwrap();
            const dt = data.filter((value)=>value._id==userId)
            // console.log(dt); // Check the data structure
  
            if (dt && dt.length > 0) {
              const user = dt[0]; // Access the first item in the array
              
              setImage(user.image.url||'')
              setName(user.name || '');
              setEmail(user.email || '');
            }
           
          } catch (err) {
            console.error(err)
          }
        };
        fetchUsers();
      }, [users,userId]);
      
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
    const submitHandler =async(e)=>{
      e.preventDefault();
       try {
        const res = await editUser({
          userId,
          name,
          email,
          image:image
        }).unwrap();
        toast.success('Profile updated');
        navigate('/admin/usersList');
       } catch (err) {
        console.log(err.error);
        toast.error(err?.data?.message||err.error)
       }
     
      
    }
  return (
    <FormContiner>
    <h1>Edit Profile</h1>
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
      <Form.Group className="my-2" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={previewFile}
                        
        ></Form.Control>
          <img src={image} height="200" alt="Image preview" />
        </Form.Group>
      <Button type="submit" variant="primary" className="mt-3">Update</Button>
    </Form>
</FormContiner>
  )
}

export default EditUser
