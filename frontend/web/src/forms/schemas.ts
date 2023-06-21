import * as yup from 'yup'

import Strings, { Regex, } from '@/constants'

import * as FieldNames from './field-names'

export const defaultEmailSchema = yup
  .string()
  .email()
  .required()
  .label('Email')


export const defaultPasswordSchema = yup
  .string()
  .min(8, Strings.signUp.beAtLeast8)
  .max(50, Strings.signUp.notExceed50)
  .matches(Regex.oneNumber, Strings.signUp.containAtLeast1Number)
  .matches(Regex.oneSpecialChar, Strings.signUp.containAtLeast1Special)
  .required(Strings.signUp.passwordMustBe)

export const defaultConfirmPassword = yup
  .string()
  .oneOf([yup.ref('password'), null,], Strings.signUp.passwordsDoNotMatch)
  .label('Password')

export const defaultCheckboxSchema = yup
  .boolean()
  .oneOf([true,])
  .required()

export const LoginSchema = yup.object().shape({
  [ FieldNames.LoginFieldNames.email ]: defaultEmailSchema,
  [ FieldNames.LoginFieldNames.password ]: defaultPasswordSchema,
})

export const SignUpSchema = yup.object().shape({
  [ FieldNames.SignUpFieldNames.email ]: defaultEmailSchema,
  [ FieldNames.SignUpFieldNames.password ]: defaultPasswordSchema,
  [ FieldNames.SignUpFieldNames.confirmPassword ]: defaultConfirmPassword,
})

export default {}
