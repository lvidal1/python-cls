import React from 'react'
import { shallow } from 'enzyme'
import { Anchor } from '../../src/components'

describe('anchor', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Anchor label="Hello world" ariaLabel="some label" path="dashboard" />)
    expect(wrapper).toHaveLength(1) // Exists
  })
})
