/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import renderHTML from 'react-render-html';
import { DOMAIN } from '../../../config';

const FullWidthSlide = (props) => {
  const { slide, width, caption, name, show, index, slug } = props;

  const handleClick = (side, e) => {
    props.handleArrowClick(side);
  };

  const showBackgroundArea = (name) => {
    switch (name) {
      case 'About me':
        return (
          <div
            className='col-12 col-md-5 cssanimation fadeInBottom right-arrow-cursor'
            id={`${show ? 'reveal-hide-image' : ''}`}
            onClick={() => handleClick('right')}
            css={css`
                  height: 100%;
                  width: ${width}px;
                  background-image: url('${slide}');
                  background-size:108%;
                  background-position:41% 47%;
                  background-repeat: no-repeat;      
                `}
          ></div>
        );

      case 'All':
        return (
          <div
            className='col-12 col-md-5 cssanimation fadeInBottom right-arrow-cursor'
            id={`${show ? 'reveal-hide-image' : ''}`}
            onClick={() => handleClick('right')}
            css={css`
                  height: 100%;
                  width: ${width}px;
                  background-image: url('${slide}');
                  background-size:93%;
                  background-position: 47%;
                  background-repeat: no-repeat;      
                `}
          ></div>
        );

      case 'Travelling':
        return (
          <div
            className='col-12 col-md-5 cssanimation fadeInBottom right-arrow-cursor'
            id={`${show ? 'reveal-hide-image' : ''}`}
            onClick={() => handleClick('right')}
            css={css`
                    height: 100%;
                    width: ${width}px;
                    background-image: url('${slide}');
                    background-size:90%;
                    background-position: 20% 35%;
                    background-repeat: no-repeat;      
                  `}
          ></div>
        );

      case 'Programming':
        return (
          <div
            className='col-12 col-md-5 cssanimation fadeInBottom right-arrow-cursor'
            id={`${show ? 'reveal-hide-image' : ''}`}
            onClick={() => handleClick('right')}
            css={css`
                    height: 100%;
                    width: ${width}px;
                    background-image: url('${slide}');
                    background-size:190%;
                    background-position: 52% 41%;
                    background-repeat: no-repeat;      
                  `}
          ></div>
        );
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      <div
        css={css`
          display: flex;
          height: 100%;
          width: ${width}px;
          flex-direction: row;
          text-align: center;
        `}
      >
        <div className='row mx-auto'>
          <div
            className='col-12 col-md-6 left-arrow-cursor'
            onClick={() => handleClick('left')}
          >
            <div
              className=' reveal-text '
              id={`${show ? 'reveal-hide-text' : ''}`}
            >
              <h2>{name}</h2>

              <div className='pb-3 category-description'>
                {renderHTML(caption)}
              </div>
              <a
                href={`${DOMAIN}/categories/${slug}`}
                className='btn category__letgo-btn'
                onClick={(e) => e.stopPropagation()}
              >
                Let's go
              </a>
            </div>
          </div>
          {showBackgroundArea(name)}
          <div className='col-md-1 social-media-area d-none d-md-block'>
            <div className='social-wrapper center'>
              <ul>
                <li className='facebook'>
                  <p>facebook</p>
                  <i className='fa fa-facebook' aria-hidden='true'></i>
                </li>

                <li className='twitter'>
                  <p>Twitter</p>
                  <i className='fa fa-twitter' aria-hidden='true'></i>
                </li>

                <li className='instagram'>
                  <i className='fa fa-instagram' aria-hidden='true'></i>

                  <p>instagram</p>
                </li>

                <li className='google'>
                  <i className='fa fa-envelope'></i>
                  <p>google</p>
                </li>

                <li className='github'>
                  <i className='fa fa-github' aria-hidden='true'></i>
                  <p>github</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FullWidthSlide;
