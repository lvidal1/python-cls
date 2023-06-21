

import { shallow, } from 'enzyme'
import React from 'react'

import { HomepageScreen, } from '../../../src/screens/home'

describe('Testing HomepageScreen', () => {
  it('renders correctly without a user', () => {
    const wrapper = shallow(<HomepageScreen clicked={() => {}} user={null} />)
    expect(wrapper).toHaveLength(1) // Exists
  })
  it('renders correctly with a user', () => {
    const wrapper = shallow(<HomepageScreen user={{ name: 'Shane', }} clicked={() => {}} />)
    expect(wrapper).toHaveLength(1) // Exists
  })
})
