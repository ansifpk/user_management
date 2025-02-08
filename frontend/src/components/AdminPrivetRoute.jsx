import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from 'react'

const AdminPrivetRoute = () => {
    const {userInfo} = useSelector((state)=>state?.auth);
    
    
  return (
   userInfo?.isAdmin?<Outlet />:<Navigate to={'/admin/login'} replace />
  )
}

export default AdminPrivetRoute