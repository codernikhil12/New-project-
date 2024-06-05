import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRouter = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  // console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to='/signin' replace /> 
  }
  return <Outlet />
}

export default AuthRouter;
