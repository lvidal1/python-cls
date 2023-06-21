import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { mountWithContext } from '../../__setup__/helpers'
import { Button } from '../../src/components'

describe('button', () => {
  it('clicks', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Button
        title="Hello world"
        ariaLabel="label"
        imgUrls={{ default: 'image1.png', selected: 'image2.png' }}
        onClick={onClick}
      />,
    )
    wrapper.props().onClick()
    expect(wrapper).toHaveLength(1) // Exists
    expect(onClick).toBeCalled()
  })
  it('returns button', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <Button
        title="Hello world"
        ariaLabel="label"
        imgUrls={{ default: 'image1.png', selected: 'image2.png' }}
        onClick={onClick}
      />,
    )
    expect(wrapper.exists('button')).toBe(true) // Exists
  })
  it('return link', () => {
    const wrapper = mountWithContext(
      <Router>
        <Button
          title="Hello world"
          ariaLabel="label"
          imgUrls={{ default: 'image1.png', selected: 'image2.png' }}
          onClick="/path/"
        />
      </Router>,
    )
    expect(wrapper.exists('a')).toBe(true) // Exists
  })
})
