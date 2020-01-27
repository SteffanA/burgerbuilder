import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

// Setup enzyme
configure({adapter: new Adapter()})

// Takes two args
// 1) Description of test bundle
// 2) Testing function
describe('<NavigationItems />', () => {
    let wrapper
    //Runs before all tests - used for setup
    beforeEach(() => {
        // Enzyme lets us render a single component standalone
        // Shallow render this navitems component
        wrapper = shallow(<NavigationItems />)
    })
    // Describes a test, takes 2 args
    // 1) Description
    // 2) Test function w/ actual testing logic
    it('should render two <NavigationItems /> elements if not authenticated', () => {
        // Expect to find 2
        expect(wrapper.find( NavigationItem )).toHaveLength(2)
    })
    
    it('should render three <NavigationItems /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        // Expect to find 3
        expect(wrapper.find( NavigationItem )).toHaveLength(3)
    })


    it('should contain a logout navigation item', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains( <NavigationItem link='/logout'>Logout</NavigationItem> )).toEqual(true)
    })
})