/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const FullWidthSliderContent = props =>{
  //console.log(props.translate);
  return (
    <div
      css={css`
        transform: translateX(-${props.translate}px);
        height: 100%;
        width: ${props.width}px;
        display: flex;
      `}
    >
      {props.children}
    </div>
  )
} 
export default FullWidthSliderContent