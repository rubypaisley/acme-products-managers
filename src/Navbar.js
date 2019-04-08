import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ managerCount }) => {
    return (

        <ul className="nav nav-pills">
            <li className="nav-item"><NavLink exact to="/" className="nav-link" activeClassName="nav-link active">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/products" className="nav-link" activeClassName="nav-link active">Products</NavLink></li>
            <li className="nav-item"><NavLink to="/managers" className="nav-link" activeClassName="nav-link active">Managers ({managerCount})</NavLink></li>
        </ul>


    )
}

export default Navbar
