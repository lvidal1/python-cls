import { action, } from '@storybook/addon-actions';
import React from 'react'
import { withScreenshot, } from 'storybook-chrome-screenshot'

import { withProvider, } from '../../../.storybook/decorators'
import SignUpForm from '.'


export default {
  title: 'Forms/Login/SignUp',
  decorators: [withScreenshot({}), withProvider,],
}

export const signUp = (): JSX.Element => 
  <SignUpForm
    onBack={action('on back')} 
  />
