import React, { Children } from 'react'
import Header from '../Header/Header'

const Layout = ({Children}) => {
  return (
    <>
      <Header/>
    <div style={{minHeight: "80vh"}}>{Children}</div>
    </>
  )
}

export default Layout
