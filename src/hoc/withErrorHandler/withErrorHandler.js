// import React from 'react'

// import Modal from '../../components/UI/Modal/Modal'
// import Aux from '../Auxillary/Auxillary'

// // Wrap this around any component that uses axios to handle errors 
// const withErrorHandler = (WrappedComponent, axios) => {
//     // Setup anonymous class for lifecycle hooks
//     return class extends React.Component { 
//         state = {
//             error: null,
//         }

//         constructor(props) {
//             super(props)
//             // Execute this code when component is created,
//             // so that we handle errors that may get caused in the
//             // wrapped component's children properly isntead of
//             // hiding them
//             console.log("Setup interceptors")

//             // Clear our errors every time we make a request
//             axios.interceptors.request.use(req => {
//                 this.setState({error: null})
//                 return req;
//             })
//             // Gets response and error, but we don't care about response
//             // so just return so the response is forwarded correctly
//             axios.interceptors.response.use(res => res, error => {
//                 this.setState({error: error})
//             })
//         }

//         errorConfirmedHandler = () => {
//             this.setState({error: null})
//         }

//         render() { 
//             // Only show our modal if we have an error existing
//             return (
//                 <Aux>
//                     <Modal show={this.state.error}
//                     modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             )
//         }
        
//   }
// }

export default withErrorHandler;

import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {error: null};
        reqInterceptor = axios.interceptors.request.use(
            req => {
                this.setState({error: null});
                return req;
            }
        );
        resInterceptor = axios.interceptors.response.use(
            res => res,
            error => this.setState({error})
        );
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => this.setState({error: null});
        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error
                        ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}
export default withErrorHandler;