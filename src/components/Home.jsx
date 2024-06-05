import React from 'react'
import { useSelector } from 'react-redux'
import Signin from '../Auth/Signin'
import CreateProduct from '../pages/CreateProduct'

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  return (
    <>
      {!isLoggedIn ? (
        <Signin />
      ) : (
        <>
          <CreateProduct />
        </>
      )}
    </>
  )
}

export default Home
