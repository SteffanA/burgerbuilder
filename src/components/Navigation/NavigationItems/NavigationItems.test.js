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
    // Describes a test, takes 2 args
    // 1) Description
    // 2) Test function w/ actual testing logic
    it('should render to <NavigationItems /> elements if not authenticated', () => {
        // Enzyme lets us render a single component standalone

        // Shallow render this navitems component
        const wrapper = shallow(<NavigationItems />)
        // Expect to find 2
        expect(wrapper.find( NavigationItem )).toHaveLength(2)
    })
})