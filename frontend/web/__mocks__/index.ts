import { mount, } from 'enzyme'
import * as React from 'react'
import { MemoryRouter, } from 'react-router-dom'

export const random = (options: Array<any>) => {
  const index = Math.round(Math.random() * (options.length - 1))
  return options[ index ]
}

// Instantiate router context
const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {},
  },
}

const createContext = () => ({
  context: { router, },
  childContextTypes: { router: {}, },
})

export const mountWithContext = (node: React.ReactNode) => mount(node, createContext())

const store = { user: {}, }

const Mocks = { store, }

export default Mocks
