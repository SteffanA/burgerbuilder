import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

// Setup enzyme
configure({adapter: new Adapter()})

// Takes two args
// 1) Description of test bundle
// 2) Testing function
describe('<BurgerBuilder />', () => {
    let wrapper
    //Runs before all tests - used for setup
    beforeEach(() => {
        // Shallow render this BurgerBuilder component
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })
    // Describes a test, takes 2 args
    // 1) Description
    // 2) Test function w/ actual testing logic
    it('should render BuildControls when recieving ingredients', () => {
        // Expect to find 2
        wrapper.setProps({ings: {salad: 1}})
        // Can't use toEqual - does a deep comparison.
        expect(wrapper.find( BuildControls)).toHaveLength(1)
    })
})