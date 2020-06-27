import Link from 'next/link';
import Router from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import { isAuth, signout } from '../actions/authAction';
import { APP_NAME } from '../config';
import NProgress from 'nprogress';
import SearchBlog from './blog/SearchBlog';
import FullWidthNavs from '../pages/components/ImageSlider/fullWidthNav';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props, scrollableNodeRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  // console.log(props.singleBlog)

  const header = useRef(null);

  useEffect(() => {
    let scrollbar = props.scrollableNodeRef.current
      ? props.scrollableNodeRef.current
      : '';
    if (scrollbar !== '') {
      // console.log(scrollbar.getScrollElement())
      scrollbar.getScrollElement().addEventListener('scroll', () => {
        const scrollCheck = scrollbar.getScrollElement().scrollTop < 100;
        if (scrollCheck !== isOnTop) {
          setIsOnTop(scrollCheck);
        }
      });
    }
  });

  return (
    <React.Fragment>
      <div className='layout-header__area row mx-0'>
        <div
          ref={header}
          className={`row mx-0 layout-header__content ${
            isOnTop ? '' : 'layout-header__sticky-navigation'
          }`}
        >
          {/* <span
            className='blog-home__brand-name'
            style={{
              color: props.singleBlog ? 'white' : '',
              borderColor: props.singleBlog ? 'white' : '',
            }}
          >
            MATTHEW
          </span> */}

          <FullWidthNavs
            slides={props.categories}
            activeSlide={props.activeSlide}
            page='layout'
            singleBlog={props.singleBlog}
            headerHeight={header.current ? header.current.clientHeight : 0}
            
            //  handleDotsClick={dotsHandleClick}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
{
  /*
   */
}
