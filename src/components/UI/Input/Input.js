import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null

    // Use this to make this Input more generic
    switch(props.elementtype) {
        case('input'):
            inputElement = <input className={classes.InputElement} 
                {...props.elementConfig} 
                val={props.val}
                onChange={props.changed}/>
            break
        case('textarea'):
            inputElement = <textarea className={classes.InputElement} 
                {...props.elementConfig} 
                val={props.val}
                onChange={props.changed}/>
            break
        case('select'):
            inputElement = <select className={classes.InputElement}
                val={props.val}
                
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.val} key={option.val}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input className={classes.InputElement} 
                {...props.elementConfig} 
                val={props.val}
                onChange={props.changed}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;