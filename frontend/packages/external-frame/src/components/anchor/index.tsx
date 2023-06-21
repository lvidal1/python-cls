import { joinStr } from '@clearsummit/carabiners'
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

type AnchorProps = {
  ariaLabel: string
  label: string
  path: string
  className?: string
}

const Anchor: React.FC<AnchorProps> = ({ ariaLabel, label, path, className }: AnchorProps) => (
  <Link aria-label={ariaLabel} className={joinStr(styles.anchor, className)} to={path}>
    {label}
  </Link>
)

Anchor.defaultProps = {
  className: undefined,
}

export default Anchor
