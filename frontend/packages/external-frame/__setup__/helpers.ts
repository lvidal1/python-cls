import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

// Instantiate router context
const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {},
  },
}

const createContext = () => ({
  context: { router },
  childContextTypes: { router: {} },
})

export const mountWithContext = (node: React.ReactNode) => mount(node, createContext())
