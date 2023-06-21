/* eslint-disable max-lines-per-function */
import * as React from 'react'

import { SecondaryButton, } from '@/components'
import BaseForm from '@/components/base-form'
import { SubmitButton, } from '@/components/base-form/buttons'
import { PasswordInputField, TextInputField, } from '@/components/base-form/fields'
import FormError from '@/components/base-form/form-error'
import Strings from '@/constants'
import { endpoints, } from '@/helpers/services'
import { signUpPayload, } from '@/redux/api-payloads'

import { SignUpFieldNames, } from '../field-names'
import { SignUpSchema, } from '../schemas'
import styles from './styles.scss'


const initialValues = {
  [ SignUpFieldNames.email ]: '',
  [ SignUpFieldNames.password ]: '',
  [ SignUpFieldNames.confirmPassword ]: '',
  [ SignUpFieldNames.firstName ]: '',
  [ SignUpFieldNames.lastName ]: '',
}

type SignUpFormProps = {
  onBack: () => void,
}

const SignUpForm: React.FC<SignUpFormProps> = (formProps) => {
  const { onBack, } = formProps

  return (
    <>
      <BaseForm
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmitPayload={signUpPayload}
        formKey={endpoints.signup}>
        <div className={styles.singUpRow}>
          <TextInputField
            name={SignUpFieldNames.firstName}
            label={Strings.signUp.firstName}
            placeholder={Strings.signUp.firstName}
          />
          <TextInputField
            name={SignUpFieldNames.lastName}
            label={Strings.signUp.lastName}
            placeholder={Strings.signUp.lastName}
          />
        </div>

        <div className={styles.singUpRow}>
          <TextInputField
            name={SignUpFieldNames.email}
            label={Strings.general.email}
            placeholder={Strings.general.email}
          />
          <PasswordInputField
            name={SignUpFieldNames.password}
            label={Strings.general.password}
            placeholder={Strings.general.password}
          />
          <PasswordInputField
            name={SignUpFieldNames.confirmPassword}
            label={Strings.signUp.confirmPassword}
            placeholder={Strings.signUp.confirmPassword}
          />
        </div>
        <FormError formKey={endpoints.signup}/>
        <div className={styles.buttons}>
          <SecondaryButton
            title={Strings.general.back}
            className={styles.btn}
            onClick={onBack}
            ariaLabel={Strings.general.back}
          />
          <SubmitButton
            title={Strings.signUp.getStarted}
            className={styles.btn}
          />
        </div>
      </BaseForm>
    </>
  )
}

export default SignUpForm
