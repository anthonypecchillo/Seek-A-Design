import React from 'react';
import { NavLink, Link } from "react-router-dom";

const Header = () => (
  <div>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/projects">Projects</NavLink>
      </li>      
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>      
    </ul>
  </div>
);

export default Header;
