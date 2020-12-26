// import React from 'react';
// import styled from 'styled-components';

// const SlideStyle = styled.div`
//         height: 100%;
//       width: ${props => props.width || 0}px;
//       background-image: url('${content}');
//       background-size: cover;
//       background-repeat: no-repeat;
//       background-position: center;
// `;

// const Slide = ({ content, width }) => <SlideStyle content width />;

// export default Slide;
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';

const Slide = ({ slide, width, caption }) => {
  return (
    <React.Fragment>
      <div
        css={css`
          display: flex;
          height: 100%;
          width: ${width}px;
          flex-direction: column;
          text-align: center;
        `}
      >
        <div
          css={css`
        height: 90%;
        width: ${width}px;
        background-image: url('${slide}');
     background-size:cover;
        @media (max-width: 700px) {
          background-size: contain;
      }
        ${
          slide === './images/daidung/prj_resp.png'
            ? 'background-position:bottom'
            : ''
        };
        background-repeat: no-repeat;
        ${'' /* background-position: center; */}
      `}
        ></div>
        <p
         css={css`
        font-size:20px;
        padding-top:10px;
        margin:0;
        @media (max-width: 700px) {
          font-size:14px;
        padding-top:0px;
      }
       
      `}
      >{caption}</p>
      </div>
    </React.Fragment>
  );
};

export default Slide;
