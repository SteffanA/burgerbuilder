import React from 'react'
// Note we must import images/static files, as when we go to
// export this project as a final build, optimization means that
// the image locations etc will change
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default logo;