import * as React from 'react'

import BaseForm from '@/components/base-form'
import { SubmitButton, } from '@/components/base-form/buttons'
import { PasswordInputField, TextInputField, } from '@/components/base-form/fields'
import FormError from '@/components/base-form/form-error'
import Strings from '@/constants'
import { endpoints, } from '@/helpers/services'
import { loginPayload, } from '@/redux/api-payloads'

import { LoginFieldNames, } from '../field-names'
import { LoginSchema, } from '../schemas'
import styles from './styles.scss'


const initialValues = {
  [ LoginFieldNames.email ]: '',
  [ LoginFieldNames.password ]: '',
}

const LoginForm: React.FC = () =>
  <>
    <BaseForm
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmitPayload={loginPayload}
      formKey={endpoints.login}>
      <div className={styles.loginInputs}>
        <div className={styles.loginInputRow}>
          <TextInputField
            type="email"
            name={LoginFieldNames.email}
            label={Strings.general.email}
            placeholder={Strings.login.enterEmail}
          />
        </div>
        <div className={styles.loginInputRow}>
          <PasswordInputField
            name={LoginFieldNames.password}
            label={Strings.general.password}
            placeholder={Strings.login.enterPassword}
          />
        </div>
      </div>
      <FormError formKey={endpoints.login} />
      <div className={styles.buttons}>
        <SubmitButton
          className={styles.loginButton}
          title={Strings.login.signIn}
        />
      </div>
    </BaseForm>
  </>

export default LoginForm
