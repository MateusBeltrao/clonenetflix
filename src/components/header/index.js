import React from 'react'
import './styles.css'

function Header({black}) {
  return (
    <header className={black ? 'black' : ''}>
        <div className='header-logo'>
          <a href='/'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt="logo"></img>
          </a>
       </div>
       <div className='header-user'>
         <a href='/'>
           <img src="https://i.pinimg.com/474x/fb/8e/8a/fb8e8a96fca2f049334f312086a6e2f6--vini-cata.jpg" alt="usuario"></img>
         </a>
       </div>
    </header>
  )
}

export default Header