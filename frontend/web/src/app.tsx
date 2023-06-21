
import { ConnectedRouter, } from 'connected-react-router'
import React from 'react'
import { render, } from 'react-dom'
import { Provider, } from 'react-redux'
import { Route, } from 'react-router'

import { Routes, } from '@/constants'
import history from '@/helpers/history'
import configureStore from '@/redux'
import App from '@/screens'
import Homepage from '@/screens/home'
import Login from '@/screens/login'
import SignUp from '@/screens/sign-up'

// Normalize must load first or it will overwrite our styles
require('normalize.css/normalize.css')
require('@/../styles/fonts.scss')
require('@/../styles/defaults.scss')

const routes = (
  <Provider store={configureStore()}>
    <ConnectedRouter history={history}>
      <App>
        <Route path={Routes.Login} exact component={Login} />
        <Route path={Routes.SignUp} exact component={SignUp} />
        <Route path={Routes.Home} component={Homepage} />
      </App>
    </ConnectedRouter>
  </Provider>
)

const app = document.getElementById('app')
if (app) render(routes, app)
