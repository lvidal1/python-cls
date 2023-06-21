import React from 'react'
import { shallow } from 'enzyme'

import { Checkbox } from '../../src/components'

describe('checkbox', () => {
  it('renders correctly', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(
      <Checkbox
        name="checkbox"
        ariaLabel="checkbox"
        onChange={mockOnChange}
        label="checkbox"
        checked={false}
      />,
    )
    const checkboxComponent = wrapper.shallow().find('input')
    checkboxComponent.simulate('change', {
      persist: jest.fn(),
    })
    expect(mockOnChange).toBeCalled()
  })
})
