import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

import About from './components/About/About';
import Head from 'next/head';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Portfolio from './components/Portfolio/Portfolio';
import Skills from './components/Skills/Skills';
import Services from './components/Services/Services';
import Experience from './components/Experience/Experience';
import SimpleBar from 'simplebar-react';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';

const scrollableNodeRef = React.createRef();

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  useEffect(() => {
    if (isLoading) document.body.classList.toggle('noscroll-active');
    else document.body.classList.remove('noscroll-active');
  }, [isLoading]);

  const head = () => (
    <Head>
      <title>Matthew | Personal Website | Developer</title>
      <meta
        name='description'
        content='My name is Matthew Tran. I am a developer. This is my personal website which is developed using MERN Stack. Hope you will find something interesting here.'
      />
      <meta
        name='keywords'
        content='personal website, mern stack, web developer, reactjs, nextjs, nodejs, expressjs'
      />
      <link rel='canonical' href={`${DOMAIN}`} />
      <meta
        property='og:title'
        content='Matthew | Personal Website | Developer'
      />
      <meta
        name='og:description'
        content='My name is Matthew Tran. I am a developer. This is my personal website which is developed using MERN Stack. Hope you will find something interesting here.'
      />
      <meta name='og:type' content='website' />
      <meta name='og:url' content={`${DOMAIN}`} />
      <meta name='og:site_name' content='Matthew | Personal Website' />

      {/* social-media */}
      <meta name='og:image' content={`${DOMAIN}/static/images/avatar.jpg`} />
      <meta
        name='og:image:secure_url'
        content={`${DOMAIN}/static/images/avatar.jpg`}
      />
      <meta name='og:image:type' content='image/jpg' />
      <meta name='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <React.Fragment>
      {head()}
      <div
        className={`loader_bg noscroll-active ${isLoading ? '' : 'to-hide'}`}
      >
        <div className={`loader  ${isLoading ? '' : 'to-hide'}`}></div>
      </div>
      <SimpleBar
        ref={scrollableNodeRef}
        id='simepleBar'
        style={{ height: '100vh' }}
      >
        <Home scrollableNodeRef={scrollableNodeRef} />
        <About />
        <Skills scrollableNodeRef={scrollableNodeRef} />
        <Services />
        <Experience />
        <Portfolio />
        <Contact />
        <div className='index-copyright-area'>
          <p className='index-copyright-text'>
            Copyright © 2020 | Website designed and developed by Matthew and
            Cheryl
          </p>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default Index;
