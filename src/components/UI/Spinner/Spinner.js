import React from 'react'
import classes from './Spinner.module.css'

// Spinner css and html courtesy of https://projects.lukehaas.me/css-loaders/
const spinner = (props) => {
    return (
        <div class="Loader" className={classes.Loader}>Loading...</div>
    )
}

export default spinner;