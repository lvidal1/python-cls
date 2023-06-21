import { ApiPayload, reduxSet as apiAC, } from '@clearsummit/radio-dispatch'
import { Formik, } from 'formik'
import * as React from 'react'
import { connect, } from 'react-redux'
import { Dispatch, } from 'redux'
import * as yup from 'yup'

import services, { endpoints, } from '@/helpers/services'

const {
  useEffect,
} = React

interface FormProps {
    /** FormKey to grab and reset submissions errors in the store and get pending / error state */
    formKey: keyof typeof endpoints,
    /** Initial values to populate the form */
    initialValues: unknown,
    /** Children can be used to render form fields */
    children: React.ReactElement<JSX.Element> | Array<React.ReactElement<JSX.Element>>,
    /** Yup schema used to validate form inputs */
    validationSchema: yup.Schema<Record<string, unknown>>,
    /** Function with curried access to the model being updated that returns the request payload */
    onSubmitPayload: (data: unknown) => ApiPayload<typeof services, unknown>,
}

interface DispatchToProps {
    /** Dispatch request payload */
    makeRequest: (payload: ApiPayload<typeof services>) => void,
    /** Dispatch to clear store errors on unmount */
    clearError: (key: string) => void,
}

type Props = FormProps & DispatchToProps

const BaseForm = (props: Props) => {
  const {
    onSubmitPayload, initialValues, validationSchema, clearError,
    formKey, children, makeRequest,
  } = props
  useEffect(() => () => clearError(formKey), [])

  const onSubmit = (data: unknown) => {
    const payload = onSubmitPayload(data)
    makeRequest(payload)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false}
    >
      {(() => (
        <>
          {children}
        </>
      ))}
    </Formik>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearError: (key: string) => dispatch(apiAC.clearError.dispatch(key)),
  makeRequest: (payload: ApiPayload<typeof services, unknown>) => dispatch(apiAC.makeRequest.dispatch(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseForm)
