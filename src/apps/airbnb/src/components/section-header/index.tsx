import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { HeaderWrapper } from './style'

const SectionHeader = memo((props:headerProps) => {
  const { title, subtitle } = props

  return (
    <HeaderWrapper>
      <h2 className='title'>{title}</h2>
      { subtitle && <div className='subtitle'>{subtitle}</div> }
    </HeaderWrapper>
  )
})
interface headerProps {
  title:string,
  subtitle:string
}

// SectionHeader.propTypes = {
//   title: PropTypes.string,
//   subtitle: PropTypes.string
// }

export default SectionHeader