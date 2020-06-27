import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { readBlog, listRelatedBlogs } from '../../actions/blogAction';
import { singleTag } from '../../actions/tagAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import CardBlog from '../../components/blog/CardBlog';

const Tags = ({ tag, blogs, query,categories }) => {
  const [separatorHeight, setSeparatorHeight] = useState(0);
  const [categoryWithLength, setCategoryWithLength] = useState([]);

  const [tags, setTags] = useState([]);

  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta
        name='description'
        content={`Categories on Matthew's Blog ${tag.name}`}
      />
      <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:title' content={`${tag.name} | ${APP_NAME}`} />
      <meta
        name='og:description'
        content={`Categories on Matthew's Blog ${tag.name}`}
      />
      <meta name='og:type' content='website' />
      <meta name='og:url' content={`${DOMAIN}/categories/${query.slug}`} />
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

  const setHeight = (height) => {
    // console.log(height)
    setSeparatorHeight(height);
  };

  return (
    <React.Fragment>
      {head()}
      <Layout categories={categories}>
        <main>
          <div className='container-fluid all-blogs-inner'>
            <div className='row mx-auto'>
              <div className='col-12 col-md-9 mt-3'>
                <h1 className='display-4 font-weight-bold'>{tag.name}</h1>
                {blogs.map((blog, index) => (
                  <div>
                    <CardBlog
                      key={index}
                      getHeightHeader={(height) => setHeight(height)}
                      blog={blog}
                    />
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tags.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log(data.tag)
      return {
        tag: data.tag,
        blogs: data.blogs,
        categories: data.listCategories,
        query,
      };
    }
  });
};

export default Tags;
