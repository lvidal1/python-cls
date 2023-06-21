import React from 'react'

import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import { MemoryRouter } from 'react-router'
import { Anchor } from '@/components'

storiesOf('Components/Anchor', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add(
    'anchor link',
    () => (
      <Anchor label={text('Label', 'anchor link')} ariaLabel="primary Anchor" path="/dashboard" />
    ),
    {
      info: {
        text: `
        This is a link component

        ~~~js
        <Anchor label={"this is a link"} path="#" className="someclass" ariaLabel="this is a link" />
        ~~~
      `,
      },
    },
  )
