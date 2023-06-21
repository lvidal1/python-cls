import mountains from './data'

const ApiService = {
  getMountain: (id: unknown): Promise<{data: unknown, status: number}> => new Promise((resolve, reject) => {
    const data = mountains[id as number]
    if (data) {
      resolve({ data, status: 200 })
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ response: { status: 404, data: { error: 'Data not available' } } })
    }
  }),
  poll: (): void => {},
}

export default ApiService
