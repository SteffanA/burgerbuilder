import React from 'react'
import { NavLink } from 'react-router-dom' // Use to style
import classes from './NavigationItem.module.css'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* Since our module css classes aren't given the names
        we give them in the module when they are displayed (since
        they're generated at runtime), we define the active class
        name (away from the default 'active') to match what our class
        currently says

        We also use exact to ensure only the truly active route gets
        the styling

        Could do this via passing props from NavigationItems too,
        if we don't want all navItem components to always be exact
        */ }
        <NavLink
         to={props.link} 
         exact
         activeClassName={classes.active}
        >
            {props.children}
        </NavLink>
    </li>
)

export default navigationItem;