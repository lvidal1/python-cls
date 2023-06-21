

import { ModalActions } from './constants'

const eventManager = {
  events: new Map<string, Function>(),
  rendered: false,
  mounted: false,

  register(action: string, callback: Function) {
    this.events.set(action, callback)
    return this
  },

  clear(action: string) {
    this.events.delete(action)
    return this
  },

  emit(action: typeof ModalActions[keyof typeof ModalActions], type?: string | Object, name?: string) {
    if (action === ModalActions.RENDER_MODAL) {
      this.rendered = true
    } else if (action === ModalActions.REMOVE_MODAL) {
      this.rendered = false
    }
    const fn = this.events.get(action)
    if (fn) {
      fn.call(null, type, name)
    }
    return this
  },
}

export default eventManager
