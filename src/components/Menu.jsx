import React from 'react'
import { NavLink } from 'react-router-dom'

function Menu({handleOnNavigate}) {
  return (
    <div id="slideout-menu">
      <ul>
        <li>
          <NavLink to="/" onClick={handleOnNavigate}>
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/stocks" onClick={handleOnNavigate}>
            <p>Stocks</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchlist" onClick={handleOnNavigate}>
            <p>Watchlist</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={handleOnNavigate}>
            <p>About</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Menu