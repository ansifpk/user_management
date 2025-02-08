import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import store from './store.js';
import {Provider} from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import PrivetRoute from './components/PrivetRoute.jsx';
import AdminPrivetRoute from './components/AdminPrivetRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx'
import AdminHomeScreen from './screens/AdminHomeScreen.jsx';
import UsersList from './screens/UsersList.jsx';
import EditUser from './screens/EditUser.jsx';
import AdminCreateUser from './screens/AdminCreateUser.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/admin/login' element={<AdminLoginScreen/>} />
      <Route path='/admin/home' element={<AdminHomeScreen/>} />
       
        
        <Route path='/admin/deleteUser' />
        <Route path='/admin/createUser' element={<AdminCreateUser/>} />
       
      {/* privet routes */}
      <Route path='' element={<PrivetRoute />}>
      <Route path='/admin/usersList' element={<UsersList/>}/>
        <Route path='/profile' element={<ProfileScreen/>} />  
      </Route>
      {/* admin prive route  */}
      <Route path='' element={<AdminPrivetRoute/>}>
          <Route path='/admin/userEdit' element={<EditUser/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
  ,
)
