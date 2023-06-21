import { User } from '../src'

describe('user model', () => {
  it('creates with defaults', () => {
    const user = new User({})
    Object.getOwnPropertyNames(user).map(v => {
      if (v[0] !== '_') {
        // Skip private properties
        expect(user[v]).toBeDefined()
      }
    })
  })
})