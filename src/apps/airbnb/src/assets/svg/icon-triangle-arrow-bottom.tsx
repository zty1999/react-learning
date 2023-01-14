import PropTypes from 'prop-types'
import React, { memo } from 'react'
import styleStrToObject from './utils'

const IconTriangleArrowBottom = memo((props:any) => {
  const { width = 10,height = 10 } = props;
  return (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={styleStrToObject(`height: ${height}px; width: ${width}px; fill: currentcolor;`)}><path d="m23.85 6.86-11.5 11a .5.5 0 0 1 -.69 0l-11.5-11a .5.5 0 0 1 .34-.86h23a .5.5 0 0 1 .35.86z" fillRule="evenodd"></path></svg>
  )
})

// IconTriangleArrowBottom.propTypes = {}

export default IconTriangleArrowBottom