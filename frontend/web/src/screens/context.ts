

import * as React from 'react'

const initialValues = {}

const AppContext = React.createContext<typeof initialValues>(initialValues)


AppContext.displayName = 'AppContext'

export { AppContext, initialValues, }

export default AppContext
