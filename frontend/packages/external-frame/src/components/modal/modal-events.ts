
import eventManager from './event-manager'
import { ModalActions } from './constants'

const emitEvent = (event: typeof ModalActions[keyof typeof ModalActions], payload?: string | Object) => {
  if (eventManager.mounted === true) {
    eventManager.emit(event, payload)
  }
}

const modal = Object.assign({
  renderModal: (type: string) => emitEvent(ModalActions.RENDER_MODAL, type),
  remove: () => emitEvent(ModalActions.REMOVE_MODAL),
  setContent: (content: Object) => emitEvent(ModalActions.SET_DETAIL_CONTENT, content),
})

eventManager
  .register(ModalActions.DID_MOUNT, () => {
    eventManager.mounted = true
  })
  .register(ModalActions.WILL_UNMOUNT, () => {
    eventManager.mounted = false
  })

export default modal
