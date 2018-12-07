import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Overview from '../pages/Overview'
import Main from './Main'
import Income from '../pages/Income'

class Nav extends Component {
    render() {
        return (
            <nav>
                <NavLink className="nLink" to="/Overview">Overview</NavLink>
                <NavLink className="nLink" to="/Bills">Bills</NavLink>
                <NavLink className="nLink" to="/Income">Income</NavLink>
            </nav>
        );
    }
}
export default Nav