/** @jsx jsx */
import React, { useState, useRef, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import SliderContent from './SliderContent';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

const Slider = (props) => {
   
  const { slides, modalWidth } = props;
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: modalWidth,
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { translate, transition, activeSlide, _slides } = state;
  const transitionRef = useRef();

  useEffect(() => {
    transitionRef.current = smoothTransition;
  });

  useEffect(() => {
    const smooth = () => {
      transitionRef.current();
    };

    const transitionend = window.addEventListener('transitionend', smooth);

    return () => {
      window.removeEventListener('transitionend', transitionend);
    };
  }, []);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [transition]);

  const smoothTransition = () => {
    let _slides = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: modalWidth,
    });
  };

  const nextSlide = () =>
    setState({
      ...state,
      translate: translate + modalWidth,
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });

  const prevSlide = () =>
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={props.modalWidth * _slides.length}
        fullWidth={false}
      >
        {_slides.map((slide) => {
          return <Slide key={slide.images} slide={slide.images} width={props.modalWidth} caption={slide.caption}/>;
        })}
      </SliderContent>
      <Arrow direction='left' handleClick={prevSlide} />

      <Arrow direction='right' handleClick={nextSlide} />

      <Dots slides={props.slides} activeSlide={activeSlide} />
    </div>
  );
};

const SliderCSS = css`
  position: relative;
  height: 80%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;
export default Slider;
