import { useFormikContext, } from 'formik'
import React from 'react'

import { Input, } from '@/components'

const addFormikFieldProps = (name: string) => {
  const { errors, values, handleBlur, handleChange, } = useFormikContext()
  return {
    // @ts-ignore
    error: errors[ name ],
    // @ts-ignore
    value: values[ name ],
    onBlur: handleBlur,
    onChange: handleChange,
  }
}

export const TextInputField = ({
  name, ...rest
}: { name: string, placeholder: string }): JSX.Element => (
  <Input
    name={name}
    {...rest}
    {...addFormikFieldProps(name)}
  />
)

TextInputField.defaultProps = Input.defaultProps

export const PasswordInputField = ({
  name, ...rest
}: { name: string, placeholder: string }): JSX.Element => (
  <Input
    {...rest}
    type="password"
    name={name}
    {...addFormikFieldProps(name)}
  />
)
PasswordInputField.defaultProps = Input.defaultProps
