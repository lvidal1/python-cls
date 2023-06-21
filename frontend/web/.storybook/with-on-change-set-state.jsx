import * as React from 'react'

// interface HOCProps {
//   ariaLabel: string,
//   placeholder?: string,
//   name: string,
//   label: string,
//   options?: Array<{ value: string, label: string }>
// }

// interface WrappedProps {
//   onChange: (value: string | null | undefined | boolean | number) => void,
//   value: string | null | undefined | boolean | number
// }

const getDefaultValue = (valueType) => {
  let value
  switch (valueType) {
    case 'string':
      value = ''
      break
    case 'boolean':
      value = false
      break
    case 'number':
      value = 0
      break
    default:
      value = null
  }
  return value
}

export function OnChangeSetStateHOC(
  WrappedComponent,
  valueType = 'string',
) {
  return class OnChangeSetState extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: getDefaultValue(valueType),
      }
    }

    onChange = (value) => {
      this.setState({ value })
    }

    render() {
      const { value } = this.state
      return <WrappedComponent {...this.props} onChange={this.onChange} value={value} />
    }
  }
}

export default OnChangeSetStateHOC
