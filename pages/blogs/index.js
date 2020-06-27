import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { getCategories } from '../../actions/categoryAction';
import CardBlog from '../../components/blog/CardBlog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import FullWidthSlider from '../components/ImageSlider/fullWidthSlider';

const Blogs = ({ router, categories }) => {
  const [modalWidth, setModalWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setModalWidth(window.innerWidth);
    }
  }, []);

  const receiveActiveSlide = (activeSlide) => {
    setActiveSlide(activeSlide);
  };

  const showCategoriesSlider =  () => {
    var tempSlides = [];
    for (var i = 0; i < categories.length; i++) {
      let tempSlide = { images: '', caption: '', name: '', index: 0, slug: '' };
      tempSlide.images =  `${API}/category/photo/${categories[i].slug}`;
      tempSlide.caption = categories[i].categoryDesc;
      tempSlide.name = categories[i].name;
      tempSlide.index = i;
      tempSlide.slug = categories[i].slug;
      tempSlides.push(tempSlide);
    }

    return (
      modalWidth !== 0 && (
        <FullWidthSlider
          fullWidth={true}
          modalWidth={modalWidth}
          slides={tempSlides}
        />
      )
    );
  };

  const head = () => (
    <Head>
      <title>Matthew | Blogs | Programming | Traveling</title>
      <meta
        name='description'
        content='I am Matthew. Welcome to my blog. Check out some of my blogs about programming and traveling and more than that you can find out more about me.'
      />
      <meta
        name='keywords'
        content='blog, programming, web developer,traveling,  reactjs, javascript, nodejs, expressjs'
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta
        property='og:title'
        content='Matthew | Blogs | Programming | Traveling'
      />
      <meta
        name='og:description'
        content='I am Matthew. Welcome to my blog. Check out some of my blogs about programming and traveling and more than that you can find out more about me.'
      />
      <meta name='og:type' content='website' />
      <meta name='og:url' content={`${DOMAIN}${router.pathname}`} />
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
      <div
        style={{
          height: '100vh',
          backgroundImage: `url('../../static/images/hinhblog44.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {showCategoriesSlider()}
      </div>
    </React.Fragment>
  );
};
//getInitialProps is used only in page not in component
Blogs.getInitialProps = () => {
  return getCategories().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        categories: data,
      };
    }
  });
};

export default withRouter(Blogs); //getInitialProps use for SSR(server side render) => SEO
