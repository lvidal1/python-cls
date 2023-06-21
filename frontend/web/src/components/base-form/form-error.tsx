import { ErrorType, selectors as apiSelectors, } from '@clearsummit/radio-dispatch'
import * as React from 'react'
import { connect, } from 'react-redux'

import Strings from '@/constants'
import { endpoints, } from '@/helpers/services'
import { StoreState, } from '@/redux'

import styles from './styles.scss'

interface FormErrorProps {
    /** FormKey to grab and reset submissions errors in the store and get error state */
    formKey: keyof typeof endpoints,
}

const FormError = ({ formError, }: { formError: ErrorType | undefined}): JSX.Element => {
  if (formError) {
    return <span className={styles.error} > {typeof formError === 'string' ? formError : Strings.general.thereWasAnError}</span>
  }
  return null
}
const mapStateToProps = (state: StoreState, props: FormErrorProps) => ({
  formError: apiSelectors.getError(state, props.formKey),
})

export default connect(mapStateToProps)(FormError)
