import React from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary'

// Wrap this around any component that uses axios to handle errors 
const withErrorHandler = (WrappedComponent, axios) => {
    // Setup anonymous class for lifecycle hooks
    return class extends React.Component { 
        state = {
            error: null,
        }

        componentDidMount() {
            // Clear our errors every time we make a request
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            // Gets response and error, but we don't care about response
            // so just return so the response is forwarded correctly
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() { 
            // Only show our modal if we have an error existing
            return (
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
        
  }
}

export default withErrorHandler;