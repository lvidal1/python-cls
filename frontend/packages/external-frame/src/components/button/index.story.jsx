import React from 'react'

import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import Images from '../../constants/images'
import { Button, SecondaryButton } from '@/components'

const options = {
  Search: { default: Images.searchIcon, selected: Images.searchPressed },
  None: null,
}

storiesOf('Components/Button', module)
  .add(
    'primary',
    () => (
      <Button
        title={text('Title', 'A Primary button')}
        ariaLabel="primary button"
        onClick={() => {}}
        imgUrls={options.None}
      />
    ),
    {
      info: {
        text: `
        This is a primary button.

        ~~~js
        <Button title={"a primary button"} />
        ~~~
      `,
      },
    },
  )
  .add(
    'primary with icon',
    () => (
      <Button
        title={text('Title', 'Primary with icon')}
        ariaLabel="primary button"
        onClick={() => {}}
        imgUrls={options.Search}
      />
    ),
    {
      info: {
        text: `
        This is a primary button with an icon

        ~~~js
        <Button title={"a primary button"} />
        ~~~
      `,
      },
    },
  )
  .add(
    'secondary',
    () => (
      <SecondaryButton
        title={text('Title', 'a secondary button')}
        ariaLabel="secondary button"
        onClick={() => {}}
      />
    ),
    {
      info: {
        text: `
        This is a secondary button.

        ~~~js
        <Button title={"a secondary button"} />
        ~~~
      `,
      },
    },
  )
