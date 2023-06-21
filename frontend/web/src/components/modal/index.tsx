
/* eslint-disable max-lines-per-function */

import { Modal as ModalComp, modalEvents as modalEventManager, } from '@clearsummit/external-frame'
import React from 'react'

const ModalConfig = {}

export const modalEvents = {
  renderModal: (type: string) => modalEventManager.renderModal(type),
  remove: modalEventManager.remove,
  setContent: (content: any) => modalEventManager.setContent(content),
}

export const Modal = () => <ModalComp modals={ModalConfig} />

export default Modal
