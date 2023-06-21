import React from 'react'

import { Header, Modal, } from '@/components'

import { AppContext, initialValues, } from './context'
import styles from './styles.scss'

type AppProps = {
  children: any | null | undefined,
}

type AppState = any

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = initialValues
  }

  render() {
    const { children, } = this.props
    return (
      <AppContext.Provider value={this.state}>
        <div className={styles.appContainer}>
          <div className={styles.main}>
            <Header />
            <div className={styles.content}>{children}</div>
          </div>
        </div>
        <Modal />
      </AppContext.Provider>
    )
  }
}




export default App
