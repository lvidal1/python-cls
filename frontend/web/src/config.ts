
import packageDotJSON from '../package.json'


interface ConfigType {
  sha?: string,
  staticPath: string,
  apiURL: string,
  version?: string | undefined,
  showsAPIBodies: boolean,
}

const { static_path, } = (window as any).challenge || {}
const devApiUrl = 'https://challenge-dev.herokuapp.com/api/v1/'
const debug: ConfigType = {
  staticPath: LOCAL_API
    ? '//127.0.0.1:8000/static'
    : 'https://challenge-dev.s3.amazonaws.com/static',
  apiURL: LOCAL_API ? 'http://127.0.0.1:8000/api/v1/' : devApiUrl,
  version: packageDotJSON.version,
  showsAPIBodies: true,
}

const staging: ConfigType = {
  staticPath: static_path ? static_path.slice(0, -1) : '',
  apiURL: 'https://challenge-stg.herokuapp.com/api/v1/',
  version: packageDotJSON.version,
  showsAPIBodies: true,
}

const production: ConfigType = {
  staticPath: static_path ? static_path.slice(0, -1) : '',
  apiURL: 'https://challenge-prd.herokuapp.com/api/v1/',
  showsAPIBodies: false,
}

const configs = {
  debug,
  staging,
  production,
}
// @ts-ignore
const environment = configs[ process.env.NODE_ENV || 'debug' ]
if (!environment) {
  /* eslint-disable */
  console.error('No config file found.  Defaulting to debug')
  /* eslint-enable */
}

const config: ConfigType = environment || debug

export default config
