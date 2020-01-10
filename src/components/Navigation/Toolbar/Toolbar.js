import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Button from '../../UI/Button/Button'

const toolbar = (props) => ( 
    <header className={classes.Toolbar}>
        <Button clicked = {props.btnClick} btnType = {'MENU'}>MENU</Button>
        {/* Add menu btn, with hamburger icon, let backdrop visible tag thru */}
        <div className={classes.Logo}>
            <Logo height="80%"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
 )

export default toolbar;