/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const FullWidthDot = (props) => {
  const { active,index } = props;
  const handleClick = (index) => {
    //  console.log('index: ',index)
    props.handleDotsClick(index);
  };
  return (
    <li onClick={()=>handleClick(index)} data-target="#carouselExampleIndicators" data-slide-to="index" className={active ? 'active' : ''}></li>
   
  );
};

const FullWidthDots = (props) => {
  const { slides, activeSlide } = props;
  return (
    
    <ol className="carousel-indicators">
      {slides.map((slide, i) => (
        <FullWidthDot key={slide.images} active={activeSlide === i} index={slide.index} {...props} />
      ))}
    </ol>
  );
};

export default FullWidthDots;
