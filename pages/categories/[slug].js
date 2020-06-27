import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { readBlog, listRelatedBlogs } from '../../actions/blogAction';
import { singleCategory } from '../../actions/categoryAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import CardBlog from '../../components/blog/CardBlog';
import { getTags } from '../../actions/tagAction';

const Categories = ({
  category,
  blogs,
  query,
  categories,
  blogLimit,
  blogSkip,
  totalBlogs,
}) => {
  const [separatorHeight, setSeparatorHeight] = useState(0);
  const [categoryWithLength, setCategoryWithLength] = useState([]);
  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [tags,setTags] = useState([]);

  useEffect(() => {
    tempGetCategoryLength();
    initTags();
  }, [categories]);

  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name='description'
        content={`Categories on Matthew's Blog ${category.name}`}
      />
      <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:title' content={`${category.name} | ${APP_NAME}`} />
      <meta
        name='og:description'
        content={`Categories on Matthew's Blog ${category.name}`}
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

  const loadMore = () => {
    let toSkip = skip + limit;
    singleCategory(query.slug, toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    
    return (
      size > 0 &&
      size >= limit && (
        <React.Fragment>
          <button onClick={loadMore} className='contact-form__submitBtn '>
            <span> Load More</span>
          </button>
          <div className='contact-form__submitBtn-srolldown'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </React.Fragment>
      )
    );
  };

  const setHeight = (height) => {
    // console.log(height)
    setSeparatorHeight(height);
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <article key={index}>
          <CardBlog
            blog={blog}
            getHeightHeader={(height) => setHeight(height)}
          />
          <hr />
        </article>
      );
    });
  };

  const showLoadedBlogs = () => {
    //console.log('loadedBlogs: ', loadedBlogs);
    return loadedBlogs.map((blog, index) => (
      <article key={index}>
        <CardBlog blog={blog} getHeightHeader={(height) => setHeight(height)} />
      </article>
    ));
  };

  
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
       console.log(data.error)
      } else {
        setTags(data);
      }
    });
  };

  const showAllTags = () => {
    return tags.map((tag, index) => {
      return (
        <Link href={`/tags/${tag.slug}`} key={index}>
          <a className='info-tag__url'>{tag.name}</a>
        </Link>
      );
    });
  };

  const showAllCategories = () => {
    return (
      categoryWithLength.length === categories.length &&
      categoryWithLength.map((category, index) => {
        // console.log('category: ', category);
        return (
          <Link href={`/categories/${category.slug}`} key={index}>
            <a className='info-category__url'>
              {category.name} ({category.length})
            </a>
          </Link>
        );
      })
    );
  };

  const tempGetCategoryLength = () => {
    getBlogsByCategory(categories).then((data) => {
      setCategoryWithLength(data);
    });
  };

  const getBlogsByCategory = async (categories) => {
    //Map and Execute the Promises
    //console.log('promise');
    return Promise.all(
      categories.map(async (category, index) => {
        try {
          let blogsByCategory = await singleCategory(category.slug);

          return {
            name: category.name,
            slug: category.slug,
            length: blogsByCategory.blogs.length,
          };
        } catch (error) {
          console.log(error);
        }
      })
    );
  };

  const showSocialMedia = () => {
    return (
      <div className='social-media__icons'>
        <a href='facebook.com'>
          <i className='fa fa-facebook' aria-hidden='true'></i>
        </a>
        <a href='facebook.com'>
          <i className='fa fa-twitter' aria-hidden='true'></i>
        </a>
        <a href='facebook.com'>
          <i className='fa fa-instagram' aria-hidden='true'></i>
        </a>
        <a href='facebook.com'>
          <i className='fa fa-github' aria-hidden='true'></i>
        </a>
        <a href='facebook.com'>
          <i className='fa fa-envelope'></i>
        </a>
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout categories={categories} activeSlide={category.name}>
        <main>
          <div className='container-fluid all-blogs-inner'>
            <div className='row mx-auto'>
              <div className='col-12 col-md-9 mt-3'>{showAllBlogs()}</div>
              <div className='d-none d-md-block col-md-3 '>
                <aside className='info-sidebar'>
                  {!!separatorHeight && (
                    <div
                      className='separator-white-holder'
                      style={{ height: separatorHeight + 'px' }}
                    ></div>
                  )}
                  <div className='info-section'>
                    <a className='info-section__url'>
                      <img
                        src={`${DOMAIN}/static/images/avatarEdited.jpg`}
                        alt='Matthew'
                        className='info-section__avatar--img '
                      />
                    </a>
                    <h5 className='info-section__name'>Matthew</h5>
                    <h6 className='info-section__job'>Web developer</h6>
                  </div>
                  <div className='info-category'>
                    <h5 className='info-category__title'>Categories</h5>
                    {showAllCategories()}
                  </div>
                  <div className='info-tags'>
                    <h5 className='info-tags__title'>Tags</h5>
                    {showAllTags()}
                  </div>
                  <div className='info-follow'>
                    <h5 className='info-follow__title'>Follow me</h5>
                    {showSocialMedia()}
                  </div>
                </aside>
              </div>
         
              <div className='col-12 col-md-9 mt-3'>{showLoadedBlogs()}</div>
            </div>
            <div className='text-center pb-5 text-center load-more-section'>
              {loadMoreButton()}
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Categories.getInitialProps = ({ query }) => {
  let skip = 0;
  let limit = 2;

  return singleCategory(query.slug, skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        category: data.category,
        blogs: data.blogs,
        query,
        categories: data.listCategories,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default Categories;
