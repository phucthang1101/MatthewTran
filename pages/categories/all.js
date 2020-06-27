import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listBlogWithCategoriesAndTags } from '../../actions/blogAction';
import { singleCategory } from '../../actions/categoryAction';
import CardBlog from '../../components/blog/CardBlog';
import Layout from '../../components/Layout';
import { APP_NAME, DOMAIN, FB_APP_ID } from '../../config';

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  router,
  blogLimit,
  blogSkip,
}) => {
  const head = () => (
    <Head>
      <title>{APP_NAME}</title>
      <meta
        name='description'
        content='Programming blogs and practice with .NET & JS to become web developer'
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta
        property='og:title'
        content={`Sharing programming knowledge | ${APP_NAME}`}
      />
      <meta
        name='og:description'
        content='Programming blogs and practice with .NET & JS to become web developer'
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

  const [limit, setLimit] = useState(blogLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [separatorHeight, setSeparatorHeight] = useState(0);
  const [categoryWithLength, setCategoryWithLength] = useState([]);

  useEffect(() => {
    tempGetCategoryLength();
  }, [categories]);

  //   useCallback(
  //       () => {
  //         tempGetCategoryLength()
  //       },
  //       [categories],
  //   )

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogWithCategoriesAndTags(toSkip, limit).then((data) => {
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

  const showAllTags = () => {
    return tags.map((tag, index) => {
      return (
        <Link href={`/tags/${tag.slug}`} key={index}>
          <a className='info-tag__url'>{tag.name}</a>
        </Link>
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
      <Layout categories={categories} activeSlide={categories[0].name}>
        <div>
          <div className='container-fluid all-blogs-inner'>
            <div className='row mx-auto'>
              <div className='col-12 col-md-9'>{showAllBlogs()}</div>
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
              <div className='col-12 col-md-9'>{showLoadedBlogs()}</div>
            </div>
          </div>

          <div className='text-center pb-5 text-center load-more-section'>
            {loadMoreButton()}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

//getInitialProps is used only in page not in component
Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs); //getInitialProps use for SSR(server side render) => SEO
