import React from 'react'

function Navbar({handleClickMenuButton}) {
  return (
    <nav>
      <h1>AssetMate</h1>
      <p id="hamburger-menu-button" onClick={handleClickMenuButton}>__<br />__<br />__</p>
    </nav>
  )
}

export default Navbar