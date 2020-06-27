import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { userPublicProfile } from '../../actions/userActions';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';

const UserProfile = ({ user, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name='description' content={`Profile of ${user.name}`} />
      <link rel='canonical' href={`${DOMAIN}/profile/${query.username}`} />
      <meta property='og:title' content={`${user.name} | ${APP_NAME}`} />
      <meta name='og:description' content={`Profile of ${user.name}`} />
      <meta name='og:type' content='website' />
      <meta name='og:url' content={`${DOMAIN}/profile/${query.username}`} />
      <meta name='og:site_name' content={`${APP_NAME}`} />

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
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-body'>
                  <h5>
                    <p> {user.name}</p>
                    <Link href={`${user.profile}`}>
                      <a>View Profile</a>
                    </Link>
                    <p className='text-muted'>
                      Joined {moment(user.createdAt).fromNow()}
                    </p>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className='container pb-5'>
          <div className='row mx-auto'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'>
                    Avartar
                  </h5>
                  <br />
                  <p>show avatar</p>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'>
                    Message {user.name}
                  </h5>
                  <br />
                  <p>Contact form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, query };
    }
  });
};
export default UserProfile;
