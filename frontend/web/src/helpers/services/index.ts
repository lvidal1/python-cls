import api from './api'


const Services = {
  ...api,
}

export type ServiceEndpoints = keyof typeof Services

// @ts-ignore
function keyObj<O>(obj: O): {[key in O]: keyof O} {
  // @ts-ignore
  return Object.keys(obj).reduce((acc: {[key in O]: string}, curr: string) => {
    // @ts-ignore
    acc[ curr ] = curr
    return acc
  }, {})
}

// @ts-ignore
export const endpoints: {[key in ServiceEndpoints]: ServiceEndpoints} = keyObj<typeof services>(Services)

export default Services