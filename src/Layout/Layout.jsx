import React, { useEffect } from 'react'
import { NavBar } from '../components/navbar/NavBar'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'

export const Layout = () => {
  return (
    <>
        <NavBar/>
        <Header/>
        <Outlet/>
        <Footer/>
    
    </>
  )
}
