import "../assets/styles/pages/Error404/error404.css";
import React from 'react'
import { Link } from 'react-router-dom'
import bee from '../assets/svgs/404-bee.svg'
import turn from '../assets/svgs/page-turn.svg'

const Error404 = () => {
  return (
    <main className='error-page'>
      <h1 className='error-title'>404 - Page not found</h1>
      <img className='error-bee' src={bee} alt="picture of a bee leaving a trail in form of a heart" />
      <p className='error-link'>Go to <Link className='error-link-span' to="/">Home</Link></p>
      <img className='error-turn' width={100} src={turn} alt="picture of a bee leaving a trail in form of a heart" />
    </main>
  )
}

export default Error404