import React from 'react'
// Note we must import images/static files, as when we go to
// export this project as a final build, optimization means that
// the image locations etc will change
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    // Pass height as a property to this class to enable responsive design
    // dependant on which field needs to use the logo
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default logo;