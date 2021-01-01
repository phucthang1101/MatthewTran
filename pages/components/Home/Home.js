import React, { useState, useEffect, useRef } from 'react';
import Scrollspy from 'react-scrollspy';
import Particles from 'react-particles-js';

import  typeWriter  from '../../../components/typeWriter';
import { DOMAIN } from '../../../config';
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!

const Home = (props) => {
  const [isOnTop, setIsOnTop] = useState(true);

  const [isExpand, setIsExpand] = useState(false);
  const selector = useRef();
  useEffect(() => {
    typeWriter();
    smoothscroll.polyfill();
  }, []);

  useEffect(() => {
    let scrollbar = props.scrollableNodeRef.current
      ? props.scrollableNodeRef.current
      : '';
    
    if (typeof window !== 'undefined') {
      if (scrollbar !== '') {
        scrollbar.getScrollElement().addEventListener('scroll', () => {
          const scrollCheck = scrollbar.getScrollElement().scrollTop < 100;
          if (scrollCheck !== isOnTop) {
            setIsOnTop(scrollCheck);
          }
        });
      }
    }
  });

  const onExpandMenu = () => {
    setIsExpand(!isExpand);
    document.body.classList.toggle('noscroll-active');
    document.querySelector('.hamburger').classList.toggle('hamburger--active');
  };

  const closeMenu = (selector) => {
    smoothscroll.polyfill();
    if (selector !== 'blog') {
      let node = document.querySelector(selector);
      // console.log(node)
      // scrollIntoView(node, { behavior: 'smooth', block: 'start' })
      node.scrollIntoView({ behavior: 'smooth' });
    }

    setIsExpand(false);
    document.body.classList.toggle('noscroll-active');
    document.querySelector('.hamburger').classList.toggle('hamburger--active');
  };

  return (
    <React.Fragment>
      <section id='home' className='home-section'>
        <div className='home-banner__bg'>
          <div
            className={`menu-area container-fluid  ${
              isExpand ? 'menu-area-active' : ''
            }`}
          >
            <div
              className={`row mx-0 w-100 ${isOnTop ? '' : 'sticky_navigation'}`}
            >
              <div className='col-xl-3 col-6 logo-area'>
                <div className='logo'>
                  <a href='/' className='navbar-brand-cus'>
                    <span className='logo'>MATTHEW</span>
                  </a>
                </div>
              </div>
              <div className='col-xl-9 col-6 expand-btn-area'>
                <div className='nav-button float-right'>
                  <button
                    className='hamburger hamburger--steps'
                    onClick={onExpandMenu}
                  >
                    <div className='hamburger__line'></div>
                    <div className='hamburger__line'></div>
                    <div className='hamburger__line'></div>
                  </button>
                </div>
              </div>
            </div>
            {isExpand && (
              <React.Fragment>
                {/* <div className='particle-area'>
                  <Particles
                    params={{
                      particles: {
                        number: {
                          value: 160,
                          density: {
                            enable: false,
                          },
                        },
                        size: {
                          value: 3,
                          random: true,
                          anim: {
                            speed: 4,
                            size_min: 0.3,
                          },
                        },
                        line_linked: {
                          enable: false,
                        },
                        move: {
                          random: true,
                          speed: 1,
                          direction: 'top',
                          out_mode: 'out',
                        },
                      },
                      interactivity: {
                        events: {
                          onhover: {
                            enable: true,
                            mode: 'bubble',
                          },
                          onclick: {
                            enable: true,
                            mode: 'repulse',
                          },
                        },
                        modes: {
                          bubble: {
                            distance: 250,
                            duration: 2,
                            size: 0,
                            opacity: 0,
                          },
                          repulse: {
                            distance: 400,
                            duration: 4,
                          },
                        },
                      },
                    }}
                  />
                </div> */}
                <div className='nav-area'>
                  <nav>
                    <Scrollspy
                      className='nav navbar-nav navbar-right'
                      items={[
                        'home',
                        'about',
                        'skills',
                        'service',
                        'experience',
                        'portfolio',
                        'contact',
                      ]}
                      currentClassName='active'
                    >
                      <li className=''>
                        <a
                          onClick={() => closeMenu('#home')}
                          className='smooth-menu'
                        >
                          Home
                        </a>
                      </li>
                      <li className=''>
                        <a
                          onClick={() => closeMenu('#about')}
                          className='smooth-menu'
                        >
                          About
                        </a>
                      </li>

                      <li className=''>
                        <a
                          onClick={() => closeMenu('#skills')}
                          className='smooth-menu'
                        >
                          Skills
                        </a>
                      </li>

                      <li className=''>
                        <a
                          onClick={() => closeMenu('#service')}
                          className='smooth-menu'
                        >
                          Services
                        </a>
                      </li>

                      <li className=''>
                        <a
                          onClick={() => closeMenu('#experience')}
                          className='smooth-menu'
                        >
                          Experience
                        </a>
                      </li>

                      <li className=''>
                        <a
                          onClick={() => closeMenu('#portfolio')}
                          className='smooth-menu'
                        >
                          Portfolio
                        </a>
                      </li>

                      <li className=''>
                        <a
                          onClick={() => closeMenu('#contact')}
                          className='smooth-menu'
                        >
                          Contact
                        </a>
                      </li>
                      <li className=''>
                        <a
                          onClick={() => closeMenu('blog')}
                          className='smooth-menu'
                          href={`${DOMAIN}/blogs`}
                        >
                          Blog
                        </a>
                      </li>
                    </Scrollspy>
                  </nav>
                </div>
              </React.Fragment>
            )}
          </div>

          <div className='banner-table'>
            <div className='banner-table-cell'>
              <div className='welcome-text'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-12 col-xs-12'>
                      <section className='intro animate-scale'>
                        {/* <div className='img-area'>
                          <img src='images/home/1.png' alt='' />
                        </div> */}

                        {/* <h3>I'm Thang</h3> */}
                        <div ref={selector} className='header-caption'>
                          <h1 className='cd-headline clip is-full-width'>
                            <span className='cd-words-wrapper'>
                              <b className='is-visible'>Welcome !</b>
                              <b className='is-hidden'>I am Matthew</b>
                              <b className='is-hidden'>Scroll down for more.</b>
                            </span>
                          </h1>
                        </div>
                      </section>

                      <div className='clearfix'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='social-mouse-area'>
            <div className='social-icon'>
              <ul className='social-icon-list'>
                <li>
                  <button className='button'>
                    <a
                      href='https://www.facebook.com/thang.tran.3576224'
                      target='_blank'
                      title='Facebook'
                      rel='noopener noreferrer'
                    >
                      <i className='fa fa-facebook' aria-hidden='true'></i>
                    </a>
                    <div className='button__horizontal'></div>
                    <div className='button__vertical'></div>
                  </button>
                </li>
                <li>
                  <button className='button'>
                    <a
                      href='https://twitter.com/Thang97093659'
                      target='_blank'
                      title='Twitter'
                      rel='noopener noreferrer'
                    >
                      <i className='fa fa-twitter'></i>
                    </a>
                    <div className='button__horizontal'></div>
                    <div className='button__vertical'></div>
                  </button>
                </li>
                <li>
                  <button className='button'>
                    <a
                      href='https://www.linkedin.com/in/thang-tran-5b80461a2/'
                      target='_blank'
                      title='Linkedin'
                      rel='noopener noreferrer'
                    >
                      <i className='fa fa-linkedin'></i>
                    </a>
                    <div className='button__horizontal'></div>
                    <div className='button__vertical'></div>
                  </button>
                </li>
                <li>
                  <button className='button'>
                    <a
                      href='https://github.com/phucthang1101'
                      target='_blank'
                      title='Github'
                      rel='noopener noreferrer'
                    >
                      <i className='fa fa-github' aria-hidden='true'></i>
                    </a>
                    <div className='button__horizontal'></div>
                    <div className='button__vertical'></div>
                  </button>
                </li>
                <li>
                  <button className='button'>
                    <a
                      href={`${DOMAIN}/blogs`}
                      target='_blank'
                      title='Check out my blog'
                      rel='noopener noreferrer'
                    >
                      <img
                        className='img img-fluid social-list__blog-icon'
                        style={{ verticalAlign: 'baseline' }}
                        src='../../../static/images/blog.png'
                        alt='blog'
                      />
                    </a>
                    <div className='button__horizontal'></div>
                    <div className='button__vertical'></div>
                  </button>
                </li>
              </ul>
            </div>
            <div className='mouse-area'>
              <a className='mouse-scroll hidden-xs dadada' href='#about'>
                <span className='mouse'>
                  <span className='mouse-movement'></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
