

import { shallow, } from 'enzyme'
import React from 'react'

import { App, } from '../../src/screens'

describe('Testing App', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <App>
        <div>Hello world!</div>
      </App>
    )
    expect(wrapper).toHaveLength(1) // Exists
  })
})
