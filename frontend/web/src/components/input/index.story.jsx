

import { boolean, } from '@storybook/addon-knobs'
import { storiesOf, } from '@storybook/react'
import React from 'react'
import { withScreenshot, } from 'storybook-chrome-screenshot'

import { Checkbox, Dropdown, Input, RadioInput, } from '..'
import withOnChangeSetState from '../../../.storybook/with-on-change-set-state'

const StateDropdown = withOnChangeSetState(Dropdown)
const StateCheckbox = withOnChangeSetState(Checkbox, 'boolean')

const options = [
  { value: 'chocolate', label: 'Chocolate', },
  { value: 'strawberry', label: 'Strawberry', },
  { value: 'vanilla', label: 'Vanilla', },
  { value: 'caramel', label: 'Caramel', },
  { value: 'banana', label: 'Banana', },
  { value: 'apple', label: 'Apple', },
]

const radioProps = [
  {
    id: 'radio-1',
    name: 'flavor',
    label: 'Chocolate',
    ariaLabel: 'RadioButton',
  },
  {
    id: 'radio-2',
    name: 'flavor',
    label: 'Strawberry',
    ariaLabel: 'RadioButton',
  },
]

storiesOf('Components/Input', module)
  .addDecorator(withScreenshot({}))
  .add(
    'Inputs',
    () => [
      <div style={{ padding: '25px', }} key="1">
        <Input
          ariaLabel="first-name"
          placeholder="First Name"
          onChange={() => {}}
          type="name"
          name="firstName"
          label="First Name"
        />
      </div>,
      <div style={{ padding: '25px', }} key="2">
        <Input
          ariaLabel="first-name"
          placeholder="First Name"
          error="Requires a value"
          onChange={() => {}}
          type="name"
          name="firstName"
          label="First Name"
        />
      </div>,
      <div style={{ padding: '25px', }} key="3">
        <Input
          ariaLabel="first-name"
          placeholder="First Name"
          success
          onChange={() => {}}
          type="name"
          name="firstName"
          label="First Name"
        />
      </div>,
    ],
    {
      info: {
        text: 'Basic Form Input with focus and example, error and success states',
      },
    }
  )
  .add(
    'Dropdown',
    () => (
      <StateDropdown
        ariaLabel="ice-cream-dropdown"
        placeholder="ice-cream"
        name="ice-cream"
        options={options}
        label="First Name"
      />
    ),
    {
      notes: 'Dropdown Input',
    }
  )
  .add(
    'Checkbox',
    () => <StateCheckbox ariaLabel="checkbox" label="Riviera Maya" name="riviera-maya" />,
    {
      notes: 'Checkbox input',
    }
  )
  .add(
    'Radio',
    () =>
      radioProps.map(({ id, name, label, ariaLabel, }) => (
        <RadioInput
          id={id}
          name={name}
          label={label}
          checked={boolean('checked', false)}
          onChange={() => {}}
          ariaLabel={ariaLabel}
          value={name}
          key={name}
        />
      )),
    {
      notes: 'Radio Input',
    }
  )
