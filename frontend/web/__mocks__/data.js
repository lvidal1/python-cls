import { User, } from '@challenge/models'

import Me200Response from '../../../api_mocks/get-api-v1-accounts-me-response-200.json'

const user = new User(Me200Response.data)

export default {
  user,
}
