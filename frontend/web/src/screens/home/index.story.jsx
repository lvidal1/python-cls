import { action, } from '@storybook/addon-actions'
import { select, } from '@storybook/addon-knobs'
import { storiesOf, } from '@storybook/react'
import React from 'react'
import { withScreenshot, } from 'storybook-chrome-screenshot'

import mockData from '../../../__mocks__/data'
import { HomepageScreen, } from "./index.tsx"

const userOptions = {
  'No User': null,
  User: mockData.user,
}

storiesOf('Screens/HomePage', module)
  .addDecorator(withScreenshot({}))
  .add(
    'with basic layout',
    () => (
      <HomepageScreen
        user={select('User', userOptions, null, 'USER_GROUP_ID')}
        clicked={action('clicked')}
      />
    ),
    {
      info: {
        text: 'Home Page',
      },
    }
  )
