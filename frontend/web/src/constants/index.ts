
import { staticPath, } from '@/helpers'

import Strings from './strings'
// Routes
export const Routes = {
  // Generic
  Login: '/',
  Home: '/home',
  SignUp: '/signup',
}

export const Images = {
  logo:  STORYBOOK
  ? require('../../../../backend/challenge/static/images/logo.png')
  : staticPath('/images/logo.png'),
  searchIcon: STORYBOOK
    ? require('../../../../backend/challenge/static/images/search.png')
    : staticPath('/images/search.png'),
  searchPressed: STORYBOOK
    ? require('../../../../backend/challenge/static/images/search-pressed.png')
    : staticPath('/images/search-pressed.png'),
  success: STORYBOOK
    ? require('../../../../backend/challenge/static/images/check@2x.png')
    : staticPath('/images/check@2x.png'),
  triangle: STORYBOOK
    ? require('../../../../backend/challenge/static/images/triangle@2x.png')
    : staticPath('/images/triangle@2x.png'),
  error: STORYBOOK
    ? require('../../../../backend/challenge/static/images/red-close@2x.png')
    : staticPath('/images/red-close@2x.png'),
}

export const ModalTypes = {}

export type ModalType = typeof ModalTypes[keyof typeof ModalTypes]

export const Regex = {
  oneLower: /(?=.*[a-z])/,
  oneUpper: /(?=.*[A-Z])/,
  oneNumber: /.*[0-9].*/,
  oneSpecialChar: /(?=.*[~`!@#$%^&*()+=_\-{}[\]|:;"'?/<>,.])/,
}

export const Cookies = {
  auth: 'auth',
}

export const StorageHelperTypes = {
  cookie: 'cookie',
  local: 'local',
}

export default Strings
