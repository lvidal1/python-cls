

import { text, } from '@storybook/addon-knobs'
import { storiesOf, } from '@storybook/react'
import React from 'react'
import { MemoryRouter, } from 'react-router'
import { withScreenshot, } from 'storybook-chrome-screenshot'

import { Anchor, } from '@/components'

storiesOf('Components/Anchor', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/',]}>{story()}</MemoryRouter>)
  .addDecorator(withScreenshot({}))
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
    }
  )
