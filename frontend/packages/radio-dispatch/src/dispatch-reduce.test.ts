import { dispatchReducer } from '.'

const TYPES = {
  LOGIN: 'LOGIN',
}
describe('dispatch-reduce', () => {
  it('returns redux  Object', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const reduxObj = dispatchReducer(TYPES.LOGIN, (state: Object, value: Object) => ({ ...state, ...value }))
    expect(reduxObj.type).toBe(TYPES.LOGIN)
    expect(reduxObj.reducer).toBeInstanceOf(Function)
    expect(reduxObj.dispatch).toBeInstanceOf(Function)
  });
});
