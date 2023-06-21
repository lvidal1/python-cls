
/* eslint-disable max-lines-per-function */

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { createSearchObject, createSearchString } from '@clearsummit/carabiners'
import { ModalActions } from './constants'

import modal from './modal-events'
import eventManager from './event-manager'

type DefaultProps = {
  type: string | null,

}
interface RequiredProps extends RouteComponentProps {
  modals: { [key: string]: React.Component<{ content: Object }> },
}


type ModalProps = RequiredProps & Partial<DefaultProps>

type ModalState = {
  currentType: string | null | undefined,
  content: Object | null | undefined,
}

export class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps: DefaultProps = {
    type: null,
  }

  constructor(props: ModalProps) {
    super(props)

    this.state = {
      currentType: props.type,
      content: null,
    }
  }

  componentDidMount() {
    const { currentType } = this.state

    eventManager
      .register(ModalActions.RENDER_MODAL, (type: string) => this.setModal(type))
      .register(ModalActions.REMOVE_MODAL, () => this.removeModal())
      .register(ModalActions.SET_CONTENT, (content: any) => this.setContent(content))
      .emit(ModalActions.DID_MOUNT)

    if (currentType) {
      eventManager.emit(ModalActions.RENDER_MODAL, currentType)
    }
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    const { currentType } = this.state

    if (currentType && prevState.currentType !== currentType)
      eventManager.emit(ModalActions.RENDER_MODAL, currentType)
  }

  componentWillUnmount() {
    eventManager.clear(ModalActions.RENDER_MODAL).emit(ModalActions.WILL_UNMOUNT)
  }

  closeModal = () => {
    modal.remove()
  }

  setContent = (content: any) => {
    this.setState({ content })
  }

  setModal = (currentType: string) => {
    this.setState({ currentType })
  }

  getModalComponent = (): React.Component<{ content: Object }> | null => {
    const { currentType } = this.state
    const { modals } = this.props

    let modalNode = null
    if (currentType && modals[currentType]) {
      modalNode = modals[currentType]
    }
    return modalNode
  }

  removeModal() {
    const { history } = this.props
    const searchObj = createSearchObject(history.location.search)
    delete searchObj.modal
    history.push({
      pathname: history.location.pathname,
      search: createSearchString(searchObj),
    })
    this.setState({
      currentType: null,
    })
  }

  render() {
    const ModalNode = this.getModalComponent()
    const { content } = this.state
    if (ModalNode) {
      // @ts-ignore
      return <ModalNode content={content} />
    }
    return null
  }
}

export default withRouter(Modal)
