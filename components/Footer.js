import React, { useEffect, useRef, useState } from 'react';
import {emailContactForm} from '../actions/formAction';
import { ToastContainer, toast } from 'react-toastify';

toast.configure();
const Footer = (props) => {
  const footerRef = useRef(null);
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false,
  });
  const { message, name, email, sent, buttonText, success, error } = values;

  useEffect(() => {
    let scrollbar = props.scrollableNodeRef.current
      ? props.scrollableNodeRef.current
      : '';

    if (typeof window !== 'undefined') {
      // console.log(scrollbar)
      if (scrollbar !== '') {
        scrollbar.getScrollElement().addEventListener('scroll', () => {
          const footerClassList = document.getElementById('blog-footer');
          const theEndClassList = document.getElementById('blog-content');

          const scrollToFooterCheck =
            footerRef && footerRef.current
              ? Math.abs(footerRef.current.getBoundingClientRect().top) < 600
              : 0;
          // console.log(theEndClassList);
          if (
            scrollToFooterCheck &&
            !footerClassList.classList.contains('is-inview')
          ) {
            footerClassList.classList.add('is-inview');
          }
          if (!scrollToFooterCheck) {
            footerClassList.classList.remove('is-inview');
          }
          const scrollToTheEndCheck =
            scrollbar.getScrollElement().scrollTop > 800;
          if (
            scrollToTheEndCheck &&
            theEndClassList &&
            !theEndClassList.classList.contains('the-end')
          ) {
            theEndClassList.classList.add('the-end');
          }
          if (!scrollToTheEndCheck && theEndClassList) {
            theEndClassList.classList.remove('the-end');
          }
        });
      }
    }
  });

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Sending...' });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        toast.error(data.error);
      } else {
        setValues({
          ...values,
          sent: true,
          name: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success,
        });
        if(data.success){
          toast.success('Thank you for contacting me ^^');
        }
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'Send Message',
    });
  };
  
  return (
    <React.Fragment>
      <footer
        ref={footerRef}
        id='blog-footer'
        className='blog-footer text-center js-parallax '
      >
        <div className='container-fluid blog-footer__container'>
          <div className='blog-footer__logo'>
            <a href='/' className='blog-footer__logo-link'>
              <span className='blog-footer__logo-brand'>MATTHEW</span>
            </a>
          </div>
          <div className='footer-container-mobile'>
            <div className='footer-grid'>
              <div className='footer-third'>
                <ul className='footer-nav-left d-md-flex'>
                  <li>
                    <i className='fa fa-map' aria-hidden='true'></i>
                    <a
                      href='https://goo.gl/maps/mRpb3Tk736uKXKxP7'
                      className='footer-nav-left__link'
                      data-toggle='modal'
                      data-target='#exampleModal'
                    >
                      Windsor Ontario, Canada
                    </a>
                  </li>

                  <li>
                    <i className='fa fa-phone' aria-hidden='true'></i>

                    <a href='tel:5199995215' className='footer-nav-left__link'>
                    +1 519 999 5215
                    </a>
                  </li>

                  <li>
                    <i className='fa fa-envelope' aria-hidden='true'></i>

                    <a
                      href='mailto:phucthangvt1101@gmail.com'
                      className='footer-nav-left__link'
                    >
                      phucthangvt1101@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className='footer-third'>
                <div className='footer-social'>
                  <ul className='footer-social__list'>
                    <li className='footer-social__item'>
                      <a
                        href='https://twitter.com/TheCarbonBeauty'
                        className='footer-social__icon -twitter'
                        target='_blank'
                      >
                        <svg className='c-twitter'>
                          <svg viewBox='0 0 24 24' id='twitter'>
                            <path d='M 21 0 L 3 0 C 1.34375 0 0 1.34375 0 3 L 0 21 C 0 22.65625 1.34375 24 3 24 L 12 24 L 12 15.75 L 9 15.75 L 9 12 L 12 12 L 12 9 C 12 6.515625 14.015625 4.5 16.5 4.5 L 19.5 4.5 L 19.5 8.25 L 18 8.25 C 17.171875 8.25 16.5 8.171875 16.5 9 L 16.5 12 L 20.25 12 L 18.75 15.75 L 16.5 15.75 L 16.5 24 L 21 24 C 22.65625 24 24 22.65625 24 21 L 24 3 C 24 1.34375 22.65625 0 21 0 Z M 21 0 ' />
                          </svg>
                        </svg>

                        <span className='footer-social__icon--circle-bg'></span>
                      </a>
                    </li>
                    <li className='c-footer_social_item'>
                      <a
                        href='https://www.pinterest.com/thecarbonbeauty/'
                        className='footer-social__icon -pinterest'
                        target='_blank'
                      >
                        <svg className='c-pinterest'>
                          <svg viewBox='0 0 24 24' id='twitter'>
                            <path d='M 12 0.25 C 5.371094 0.25 0 5.644531 0 12.296875 C 0 17.621094 3.4375 22.136719 8.207031 23.730469 C 8.808594 23.839844 9.027344 23.46875 9.027344 23.148438 C 9.027344 22.863281 9.015625 22.105469 9.011719 21.101562 C 5.671875 21.828125 4.96875 19.484375 4.96875 19.484375 C 4.421875 18.09375 3.636719 17.722656 3.636719 17.722656 C 2.546875 16.976562 3.71875 16.988281 3.71875 16.988281 C 4.921875 17.074219 5.554688 18.230469 5.554688 18.230469 C 6.625 20.074219 8.363281 19.542969 9.046875 19.230469 C 9.15625 18.453125 9.464844 17.921875 9.808594 17.621094 C 7.144531 17.316406 4.34375 16.285156 4.34375 11.667969 C 4.34375 10.351562 4.8125 9.277344 5.578125 8.433594 C 5.457031 8.128906 5.042969 6.902344 5.695312 5.246094 C 5.695312 5.246094 6.703125 4.921875 8.996094 6.480469 C 9.953125 6.214844 10.980469 6.082031 12 6.074219 C 13.019531 6.082031 14.046875 6.214844 15.007812 6.480469 C 17.296875 4.921875 18.304688 5.246094 18.304688 5.246094 C 18.957031 6.90625 18.546875 8.128906 18.421875 8.433594 C 19.191406 9.277344 19.65625 10.355469 19.65625 11.667969 C 19.65625 16.296875 16.851562 17.316406 14.179688 17.613281 C 14.609375 17.984375 14.992188 18.722656 14.992188 19.84375 C 14.992188 21.457031 14.976562 22.753906 14.976562 23.148438 C 14.976562 23.472656 15.195312 23.847656 15.800781 23.726562 C 20.566406 22.132812 24 17.617188 24 12.296875 C 24 5.644531 18.628906 0.25 12 0.25 Z M 12 0.25 ' />
                          </svg>
                        </svg>
                        <span className='footer-social__icon--circle-bg'></span>
                      </a>
                    </li>
                    <li className='c-footer_social_item'>
                      <a
                        href='https://www.instagram.com/shopcarbonbeauty/'
                        className='footer-social__icon -instagram'
                        target='_blank'
                      >
                        <svg className='c-instagram'>
                          <svg viewBox='0 0 24 24' id='twitter'>
                            <path d='M 0 7.5 L 5.367188 7.5 L 5.367188 24 L 0 24 Z M 0 7.5 ' />
                            <path d='M 19.984375 7.695312 C 19.929688 7.675781 19.875 7.65625 19.816406 7.640625 C 19.742188 7.621094 19.671875 7.609375 19.597656 7.597656 C 19.3125 7.539062 19 7.5 18.632812 7.5 C 15.503906 7.5 13.519531 9.777344 12.867188 10.65625 L 12.867188 7.5 L 7.5 7.5 L 7.5 24 L 12.867188 24 L 12.867188 15 C 12.867188 15 16.921875 9.351562 18.632812 13.5 C 18.632812 17.203125 18.632812 24 18.632812 24 L 24 24 L 24 12.867188 C 24 10.371094 22.292969 8.296875 19.984375 7.695312 Z M 19.984375 7.695312 ' />
                            <path d='M 5.25 2.625 C 5.25 4.074219 4.074219 5.25 2.625 5.25 C 1.175781 5.25 0 4.074219 0 2.625 C 0 1.175781 1.175781 0 2.625 0 C 4.074219 0 5.25 1.175781 5.25 2.625 Z M 5.25 2.625 ' />
                          </svg>
                        </svg>
                        <span className='footer-social__icon--circle-bg'></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='footer__contact-section'>
                  <h4 className='contact-form__title'>Send me message</h4>
                  <form
                    action=''
                    target='_blank'
                    method='post'
                    className='footer__contact-form'
                    onSubmit={clickSubmit}
                  >
                    <input
                      type='text'
                      name='name'
                      placeholder='Name'
                      onChange={handleChange('name')}
                      value={name}
                    />

                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      onChange={handleChange('email')}
                      value={email}
                    />
                    <textarea
                      type='email'
                      name='EMAIL'
                      className='contact-form__placeholder'
                      placeholder='Message'
                      onChange={handleChange('message')}
                      value={message}
                    />

                    {/* <div style='position: absolute; left: -5000px;'> */}
                    <div style={{ position: 'absolute', left: '-5000px' }}>
                      <input
                        type='text'
                        name='b_6b35c6629337233f1bb07486e_67899d8674'
                        tabIndex='-1'
                        value=''
                      />
                    </div>
                    <button
                      className='contact-form__submitBtn'
                      title='Subscribe'
                    >
                      <span>Subscribe</span>
                    </button>
                  </form>
                </div>
              </div>
              <div className='footer-third'>
                <ul className='footer-nav-left d-md-block'>
                  <li style={{ textAlign: 'justify' }}>
                    <p href='/pages/privacy-policy' className='footer-about-me'>
                      Hi &#9996; Im Matthew Tran.
                      <br /> Im a newcomer in Ontario Canada.
                      <br /> Im now looking for a job (part-time || freelance)
                      as a Web Developer.{' '}
                      <i className='fa fa-laptop' aria-hidden='true'></i>
                      <br /> Here is my resume.{' '}
                      <i className='fa fa-file-pdf-o' aria-hidden='true'></i>
                      <br />
                      Check it out !
                    </p>
                    <a href="../static/Matt's Resume.pdf" target='_blank'>
                      <div className='download-btn btn-1'>
                        <div className='download-btn__top'>
                          <i className='fa fa-download'></i> DOWNLOAD
                        </div>
                        <div className='download-btn__bottom'>
                          <span className='icon fa fa-file-text'></span>
                          Matt's Resume.pdf
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='footer-copyright-area'>
        <p className='footer-copyright-text'>
          Copyright © 2020 | Website designed and developed by Matthew and
          Cheryl
        </p>
      </div>
    </React.Fragment>
  );
};
export default Footer;
