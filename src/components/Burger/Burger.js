import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

// import { withRouter } from 'react-router-dom' // HOC that provides access to Router props

const burger = (props) => {
    // Maps our object into an array of ingredient JSX
    if (props.ingredients === null) {
        return (
            <div className={classes.Burger}>
                <BurgerIngredients type="bread-top"/>
                <BurgerIngredients type="bread-bottom"/>
            </div>
        )
    }
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log("first map for transformed, igKey ", igKey)
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                    // currently have [smth,smth]
                    // Map the key, which is the ingredient, i is index.
                    console.log("internal map for transformed, _" + _ + ' i ' + i)
                    return (<BurgerIngredients key={igKey + i} type={igKey} />)
                })
        }).reduce((arr, el) => {
            // Use reduce to flatten our array from an array of numIngredients Arrays
            // to a single array
            return (
                // Concat each element to our array
                arr.concat(el)
            )
        }, []) //second arg is the default return value, an empty array in this instance
    console.log("transformed finally is: ", transformedIngredients)

    // Output a message if no ingredients passed
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    )
}

export default burger;
// export default withRouter(burger);