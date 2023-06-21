import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'


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

export const withProvider = (Story) => <Provider store={store}><Story /></Provider>

export default {
  centerStory,
}
