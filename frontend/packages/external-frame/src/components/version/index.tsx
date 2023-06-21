
import * as React from 'react'
import styles from './styles.scss'

type VersionProps = {
  version: string,
}

const Version = (props: VersionProps) => {
  const { version } = props
  if (version) {
    return (
      <div className={styles.version}>
        <span>{version}</span>
      </div>
    )
  }
  return null
}

export default Version
