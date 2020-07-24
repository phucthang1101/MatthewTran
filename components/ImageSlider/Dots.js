/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const Dot = (props) => {
  const { active, index } = props;
  const handleClick = (index) => {
    //  console.log('index: ',index)
    props.handleDotsClick(index);
  };
  return (
    <span
      css={css`
        padding: 10px;
        margin-right: 5px;
        cursor: pointer;
        border-radius: 50%;
        background: ${active ? 'black' : 'red'};
      `}
      onClick={() => handleClick(index)}
    ></span>
  );
};

const Dots = (props) => {
  const { slides, activeSlide } = props;
  return (
    <div
      css={css`
        position: absolute;
        bottom: 12%;
        @media (max-width: 700px) {
          bottom: 20%;
        }
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {slides.map((slide, i) => (
        <Dot
          key={slide.images}
          active={activeSlide === i}
          index={slide.index}
          {...props}
        />
      ))}
    </div>
  );
};

export default Dots;
