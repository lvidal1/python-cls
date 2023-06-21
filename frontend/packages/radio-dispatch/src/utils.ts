export const CONSTANTS = {
  ERROR: 'Error',
  PENDING: 'Pending',
  META: 'Meta',
}

export function getErrorKey<S>(serviceKey: keyof S): string {
  if (typeof serviceKey === 'string') {
    return `${serviceKey}${CONSTANTS.ERROR}`
  }
  return ''
}

export function getPendingKey<S>(serviceKey: keyof S): string {
  if (typeof serviceKey === 'string') {
    return `${serviceKey}${CONSTANTS.PENDING}`
  }
  return ''
}

export function getMetaKey<S>(serviceKey: keyof S): string {
  if (typeof serviceKey === 'string') {
    return `${serviceKey}${CONSTANTS.META}`
  }
  return ''
}
