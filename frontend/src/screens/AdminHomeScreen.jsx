import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { useAdminHomeMutation } from '../slices/adminApiSlice';


const AdminHomeScreen = () => {
  const {userInfo} = useSelector((state)=>state.auth); 
 
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          {userInfo?(
            <>
            <h1 className='text-center mb-4' style={{color:'red'}}>Welcome {userInfo.name}</h1>
          <h1 className='text-center mb-4'>name : {userInfo.name}</h1>
          <h1 className='text-center mb-4'>email : {userInfo.email}</h1>
            </>
          ):(
            <>
            <div>
               <h1 className='text-center mb-4' style={{color:'red'}}>Please Sign In or sign Up </h1>
             </div>
              <div className='d-flex'>
             
            <LinkContainer to={'/login'}>
               <Button variant='primary'  className='me-3'>
                    Sign In
               </Button>
            </LinkContainer>
            <LinkContainer to={'/register'}>
                <Button variant='secondary' >
                        SIgn Up
                </Button>
            </LinkContainer>
          </div>
            </>
          )}
          
        
        </Card>
      </Container>
    </div>
  );
};

export default AdminHomeScreen;