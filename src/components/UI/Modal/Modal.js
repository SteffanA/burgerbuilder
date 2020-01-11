import React, { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxillary/Auxillary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component { 
    // Ensure we only update the modal if it's going from
    // hidden to visible or vice versa.
    // This also prevents OrderSummary from updating unneccessarily
    shouldComponentUpdate(nextProps, nextState) {
        // If state could change in Modal, we would also want to
        // check other things. RN this is okay
        // We should also update if we get new children
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        console.log('Modal updated')
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal} 
                    style={{ 
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
    

 }

export default Modal;