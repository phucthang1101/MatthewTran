/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const Arrow = ({ direction, handleClick }) => (
  <div
    onClick={handleClick}
    css={css`
      display: flex;
      position: absolute;
      top: 35%;
      ${direction === 'right' ? `right: 25px` : `left: 25px`};
      @media (max-width: 700px) {
        top: 45%;
        ${direction === 'right' ? `right: 15px` : `left: 15px`};
      }
      height: 50px;
      width: 50px;
      justify-content: center;
      background: #9292927a;
      border-radius: 50%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      img {
        transform: translateX(${direction === 'left' ? '-2' : '2'}px);
        &:focus {
          outline: 0;
        }
      }
    `}
  >
    {direction === 'right' ? (
      <i className='fa fa-chevron-right' aria-hidden='true'></i>
    ) : (
      <i className='fa fa-chevron-left' aria-hidden='true'></i>
    )}
  </div>
);

export default Arrow;
