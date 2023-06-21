import * as React from 'react'
import { MemoryRouter } from 'react-router'

export const centerStory = story => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'white',
    }}
  >
    {story()}
  </div>
)

export const withRouter = story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>

export default {
  centerStory,
}
