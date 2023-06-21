import { useFormikContext, } from 'formik'
import React from 'react'

import { Button, } from '@/components'


export const SubmitButton = (props: any): JSX.Element => {
  const { handleSubmit, } = useFormikContext()

  return (<Button
    {...props}
    type="submit"
    onClick={handleSubmit}
  />)
}