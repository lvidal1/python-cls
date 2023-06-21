declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

interface StandardAction<T = unknown> {
  type: string;
  payload: T;
}

type GeneratorType = Generator<any, any, any>

type JWTTokens = { refresh: string, access: string }

declare let STORYBOOK: boolean

declare let LOCAL_API: boolean
