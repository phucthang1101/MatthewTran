/** @jsx jsx */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { css, jsx } from '@emotion/core';
import FullWidthSliderContent from './fullWidthSliderContent';
import FullWidthSlide from './FullWidthSlide';
import Arrow from './Arrow';
import FullWidthDots from './fullWidthDots';
import { CSSTransition } from 'react-transition-group';
import isEqual from 'lodash.isequal';
import FullWidthNav from './fullWidthNav';
const FullWidthSlider = (props) => {
  const { slides, modalWidth, fullWidth } = props;
  // console.log('modalWidth: ', modalWidth);
  // console.log('slides: ', slides);
  // console.log('fullWidth: ', fullWidth);
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];
  const [oldSlides, setOldSlides] = useState([]);
  const [firstTime, setFirstTime] = useState(0);
  const [state, setState] = useState({
    activeSlide: 0,
    translate: modalWidth,
    // transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { translate, activeSlide, _slides } = state;

  //create ref:
  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const smooth = (e) => {
      if (e.target.className.includes('fadeOutBottom')) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    const animationEnd = window.addEventListener('animationend', smooth);
    const onResize = window.addEventListener('resize', resize);

    let interval = null;
    if (props.autoPlay) {
      console.log(props.autoPlay);
      interval = setInterval(play, props.autoPlay * 1000);
    }

    return () => {
      window.removeEventListener('animationend', animationEnd);
      window.removeEventListener('resize', onResize);

      if (props.autoPlay) {
        clearInterval(interval);
      }
    };
  }, []);

  const handleResize = () => {
    //console.log('useEffect-handleResize');
    setState({ ...state, translate: modalWidth });
  };

  useEffect(() => {
    // console.log('new Effect');
    transitionRef.current();
  }, [translate]);

  useEffect(() => {
    // console.log('useEffect set old slides');
    setOldSlides(_slides);
    setState({ ...state, translate: modalWidth });
  }, [_slides]);

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

      translate: modalWidth,
    });
  };

  const nextSlide = () => {
    // console.log('nextSlide');
    let h1Text = document.getElementById('reveal-hide-text');
    h1Text.className += ' hide-text';

    let toggleImage = document.getElementById('reveal-hide-image');
    toggleImage.className += ' fadeOutBottom';

    setState({
      ...state,
      translate: modalWidth,
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });
  };

  const prevSlide = () => {
    let h1Text = document.getElementById('reveal-hide-text');
    h1Text.className += ' hide-text';

    let toggleImage = document.getElementById('reveal-hide-image');
    toggleImage.className += ' fadeOutBottom';

    setState({
      ...state,
      translate: modalWidth,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });
  };

  const arrowHandleClick = (click) => {
    if (click === 'left') prevSlide();
    else nextSlide();
  };

  const dotsHandleClick = (index) => {
    // console.log('index: ',index)
    let h1Text = document.getElementById('reveal-hide-text');
    h1Text.className += ' hide-text';

    let toggleImage = document.getElementById('reveal-hide-image');
    toggleImage.className += ' fadeOutBottom';
    // console.log('toggle classname',toggleImage.className)
    setState({
      ...state,
      translate: modalWidth,
      activeSlide: index,
    });
  };
  return (
    <React.Fragment>
      <div className='row mx-0 slider-header'>
        <FullWidthNav
          slides={slides}
          activeSlide={activeSlide}
          page='slider'
          handleDotsClick={dotsHandleClick}
        />
      </div>
      <div
        css={css`
          position: relative;
          height: ${fullWidth ? '90vh' : '80%'};
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
        `}
      >
        <FullWidthSliderContent
          translate={translate}
          width={props.modalWidth * _slides.length}
        >
          {_slides.map((slide, index) => {
            return (
              <FullWidthSlide
                key={slide.images + index}
                show={slide.index === activeSlide}
                slide={slide.images}
                width={props.modalWidth}
                caption={slide.caption}
                name={slide.name}
                handleArrowClick={arrowHandleClick}
                index={slide.index}
                slug={slide.slug}
                slideAnimationDone={(done) => handleSlideAnimationDone(done)}
              />
            );
          })}
        </FullWidthSliderContent>
        <div className='d-block d-md-none'>
          <Arrow direction='left' handleClick={prevSlide} />

          <Arrow direction='right' handleClick={nextSlide} />
        </div>

        <FullWidthDots
          slides={props.slides}
          activeSlide={activeSlide}
          handleDotsClick={dotsHandleClick}
        />
      </div>
    </React.Fragment>
  );
};

const SliderCSS = css`
  position: relative;
  height: 80%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;
export default FullWidthSlider;
