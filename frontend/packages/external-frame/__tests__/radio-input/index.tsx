import React from 'react'
import { shallow } from 'enzyme'
import { RadioInput } from '../../src/components'

describe('radio', () => {
  it('renders correctly', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <RadioInput
        ariaLabel="radio"
        id="radio"
        label="radio"
        onChange={mockOnChange}
        name="radio"
        checked={false}
      />,
    )
    const radioInput = wrapper.shallow().find('input')
    radioInput.simulate('change', {
      persist: jest.fn(),
    })
    expect(mockOnChange).toBeCalled()
  })
})
