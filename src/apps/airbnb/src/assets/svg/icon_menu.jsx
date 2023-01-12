import React, { memo } from 'react'
import styleStrToObject from './utils'

const IconMenu = memo((props) => {
  const { width = 12,height = 12 } = props;
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={styleStrToObject(`display: block; fill: none; height: ${height}px; width: ${width}px; stroke: currentcolor; stroke-width: 3; overflow: visible;`)}><g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
  )
})

export default IconMenu