import React from 'react';
import { DOMAIN } from '../../../config';

const About = () => {
  return (
    <section id='about' className='about-section'>
      <div className='about-section__title text-center mb-40'>
        <div className='row mx-0'>
          <div className='service-title'>
            <h2>
              About <span>Me </span>
            </h2>
            <div className='horizontal-line'>
              <div className='top'></div>
              <div className='bottom'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='about-section__content row mx-5 mt-5'>
        <div className='col-md-5 col-sm-12'>
          <div className='about-section__content-avatar'>
          {/* <div className='about-avatar'></div> */}
            <img src={`${DOMAIN}/static/images/avatar2.jpg`} alt='about' />
          </div>
        </div>
        <div className='col-md-7 col-sm-12'>
          <div className='about-section__content--right'>
            <h2>Fullstack Developer</h2>
            <p>
              I am <span>Matthew Tran</span>. I am a simple , co-operative,
              responsible and quite weird person. I always analyze things
              carefully before starting any work.
            </p>
            <p>
              I have experience in HTML5, CSS3, Javascript, NodeJS, ReactJS, ASP
              .NET, NextJS and on. I always look for an opportunity to gain more
              knowledge and experience.{' '}
            </p>

            <div className='row'>
              <div className='col-sm-6'>
                <ul className='about-list'>
                  <li>
                    {' '}
                    <span className='title'>Name</span>{' '}
                    <span className='value'>Matthew Tran</span>{' '}
                  </li>
                  <li>
                    {' '}
                    <span className='title'>Age</span>{' '}
                    <span className='value'>21</span>{' '}
                  </li>
                  <li>
                    {' '}
                    <span className='title'>Email</span>{' '}
                    <a
                      className='montserrat weight-regular capitalize'
                      href='mailto:phucthangvt1101@gmail.com'
                    >
                      <span className='value'>phucthangvt1101@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className='col-sm-6'>
                <ul className='about-list'>
                  <li>
                    {' '}
                    <span className='title'>Phone</span>{' '}
                    <span className='value'>+1 226 724 4502</span>{' '}
                  </li>
                  <li>
                    {' '}
                    <span className='title'>Address</span>{' '}
                    <span className='value'>Windsor, ON, Canada</span>{' '}
                  </li>
                  <li>
                    {' '}
                    <span className='title'>Hobby</span>{' '}
                    <span className='value'>
                      Coding, Sport, Books
                    </span>{' '}
                  </li>
                </ul>
              </div>
            </div>
            <div className='row'>
              <div className='trapdoor'>
                <div className='top door'></div>
                <div className='bottom door'></div>
                <a
                  href='#contact'
                  className='twitter-follow-button'
                  data-show-count='false'
                  data-size='large'
                  data-dnt='false'
                >
                  <i className='fa fa-arrow-down' aria-hidden='true'></i>
                </a>
              </div>
              {/* <a href='#skills-bd' className='skill-btn btn-a'>
              my skills
            </a> */}
              <div className='ct-btn'>
                <button className='border-neon'><a href="../static/Matt's Resume.pdf" target="_blank">Download CV</a></button>
              </div>
              {/* <div>
            <a
              href='images/about/demo-cv.png'
              className='down-btn btn-a'
              download=''
            >
              download cv
            </a>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
