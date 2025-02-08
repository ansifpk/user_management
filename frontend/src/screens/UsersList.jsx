import React, { useEffect } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useDeleteUserMutation, useUsersListMutation } from '../slices/adminApiSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const UsersList = () => {
    const [usersList, { data, isLoading, error }] = useUsersListMutation();
    const [deleteUser] = useDeleteUserMutation();
  
   
    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
             await usersList().unwrap();
          } catch (err) {
            console.error(err)
          }
        };
        fetchUsers();
      }, [usersList]);

      const handleDelet=async(id)=>{
          try {
           const res =  await deleteUser({id}).unwrap();
           if(res){
            toast.success('User Deleted Successfully');
            const tag = document.getElementById(id)
            tag.remove();
            navigate('/admin/usersList');
           }
          } catch (error) {
            
          }
      }
     
  return (
    <Container>
      {data?(
        <>
        {data.map(user => (
        <Card key={user._id} className="mb-3" id={user._id} >
          <Card.Header as="h5">{user.name}</Card.Header>
          <Card.Body className="d-flex justify-content-between align-items-center">
          <img src={user.image.url} height="50" alt="Image preview" />
            <div>{user.email}</div>
            <div>
              <Link to={`/admin/userEdit?id=${user._id}`}>
                 <Button variant="primary" className="me-2">Edit</Button>
              </Link>
           
              <Button variant="primary" onClick={()=>handleDelet(user._id)}>Delete</Button>
          
            </div>
          </Card.Body>
        </Card>
      ))}
        </>
      ):(
        <>
        <h1>no users are avaliabe</h1>
        </>
      )}
    </Container>
  
)
}

export default UsersList
