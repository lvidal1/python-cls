import React from 'react'
import { shallow } from 'enzyme'
import Images from '../../src/constants/images'
import { Input } from '../../src/components'

describe('input', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Input
        ariaLabel="input"
        placeholder="input"
        error=""
        success={false}
        onChange={jest.fn()}
        type="text"
        name="input"
      />,
    )
    expect(wrapper).toHaveLength(1) // Exists
  })
  it('renders accessory', () => {
    const wrapper = shallow(
      <Input
        ariaLabel="input"
        placeholder="input"
        error=""
        success={false}
        onChange={jest.fn()}
        type="text"
        name="input"
        accessory={Images.triangle}
      />,
    )
    const imgTag = wrapper.shallow().find('img')
    const props = imgTag.props()
    expect(props.alt).toEqual('accessory')
    expect(wrapper).toHaveLength(1) // Exists
  })
})
