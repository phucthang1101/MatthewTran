import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useState, useEffect } from 'react';
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

const HeaderAdmin = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <SearchBlog />
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavbarBrand style={{ cursor: 'pointer' }}>{APP_NAME}</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link href='/blogs'>
                <NavLink style={{ cursor: 'pointer' }}>Blogs</NavLink>
              </Link>
            </NavItem>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink style={{ cursor: 'pointer' }}>Sign Up</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink style={{ cursor: 'pointer' }}>Sign In</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace('/signin'))}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href='/user'>
                  <NavLink style={{ cursor: 'pointer' }}>
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href='/admin'>
                  <NavLink style={{ cursor: 'pointer' }}>
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};
export default HeaderAdmin;
