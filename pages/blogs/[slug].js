import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { readBlog, listRelatedBlogs } from '../../actions/blogAction';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import CardRelatedBlog from '../../components/blog/CardRelatedBlog';
import Comment from '../../components/blog/Comment';
import {
  getCommentsByBlogID,
  createComment,
  createCommentReply,
} from '../../actions/commentAction';
import { singleCategory } from '../../actions/categoryAction';
import { ToastContainer, toast } from 'react-toastify';

toast.configure();
const SingleBlog = ({ blog, router, query, categories }) => {
  // console.log(blog.categories[0].name);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [replyCommentShowing, setReplyCommentShowing] = useState(false);
  const [replyCommentValues, setReplyCommentValues] = useState({
    error: '',
    success: '',
    replyCommentFormData: '',
    replyCommentUsername: '',
    replyCommentEmail: '',
    replyCommentText: '',
  });

  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    username: '',
    email: '',
    commentText: '',
  });

  const loadRelatedBlog = () => {
    listRelatedBlogs({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedBlogs(data);
      }
    });
  };

  const loadComments = () => {
    getCommentsByBlogID(blog._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComments(data);
      }
    });
  };

  //fire loadRelatedBlog() when componentDidMount
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    setReplyCommentValues({
      ...replyCommentValues,
      replyCommentFormData: new FormData(),
    });
    loadRelatedBlog();
    loadComments();
  }, []);

  const { error, success, formData, username, commentText, email } = values;
  const {
    replyCommentUsername,
    replyCommentFormData,
    replyCommentText,
    replyCommentEmail,
  } = replyCommentValues;

  const showRelatedBlogs = () => {
    return relatedBlogs.map((blog, index) => (
      <CardRelatedBlog key={index} blog={blog} />
    ));
  };

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name='description' content={blog.mdesc} />
      <link rel='canonical' href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property='og:title' content={`${blog.title} | ${APP_NAME}`} />
      <meta name='og:description' content={blog.mdesc} />
      <meta name='og:type' content='website' />
      <meta name='og:url' content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta name='og:site_name' content={`${APP_NAME}`} />

      {/* social-media */}
      <meta name='og:image' content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        name='og:image:secure_url'
        content={`${DOMAIN}/static/images/avatar.jpg`}
      />
      <meta name='og:image:type' content='image/jpg' />
      <meta name='fb:app_id' content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = (blog) =>
    blog.categories.map((category, index) => {
      return (
        <Link key={index} href={`/categories/${category.slug}`}>
          <a className=''>{category.name}</a>
        </Link>
      );
    });

  const showBlogTags = (blog) =>
    blog.tags.map((tag, index) => {
      return (
        <Link key={index} href={`/tags/${tag.slug}`}>
          <a className=''>
            {tag.name} {index === blog.tags.length - 1 ? '' : ' - '}{' '}
          </a>
        </Link>
      );
    });

  const toggleReplyCommentForm = (index) => {
    let formId = `replyCommentForm-${index}`;

    document.getElementById(formId).style.display =
      document.getElementById(formId).style.display == 'none'
        ? 'block'
        : 'none';
  };

  const handleChangeReply = (name, commentId) => (e) => {
    const value = e.target.value;
    //  console.log(formData);
    if (commentId) {
      replyCommentFormData.set('commentId', commentId);
      replyCommentFormData.set(name, value);
    } else {
      replyCommentFormData.set(name, value);
      replyCommentFormData.set('blogId', blog._id);
    }

    setReplyCommentValues({
      ...replyCommentValues,
      [name]: value,
      replyCommentFormData,
    });
  };

  const submitReplyComment = (index) => (e) => {
    e.preventDefault();
    // for (var value of replyCommentFormData.values()) {
    //   console.log(value);
    // }
    createCommentReply(replyCommentFormData).then((data) => {
      if (data.error) {
        console.log('err:', data.error);
        setReplyCommentValues({ ...replyCommentValues, error: data.error });
        toast.error(data.error);
      } else {
        setReplyCommentValues({
          ...replyCommentValues,

          error: '',
          success: `Comment created successfully`,
        });
        loadComments();
        toast.success('Comment created successfully');
       // console.log('index: ', index);
        let formId = `replyCommentForm-${index}`;
        document.getElementById(formId).style.display = 'none';
        setReplyCommentValues({
          ...replyCommentValues,
          replyCommentUsername: '',
          replyCommentText: '',
          replyCommentEmail: '',
        });
      }
    });
  };

  const showBlogComments = () => {
    return comments.map((comment, index) => {
      return (
        <li key={index} className='media mb-2  w-75 comment-wrapper'>
          <div className='comment-img'>
            <img
              className='mr-3 d-flex rounded-circle'
              src={`${DOMAIN}/static/images/n1.png`}
              alt='Generic placeholder image'
              style={{ width: '80px', height: '80px' }}
            />
          </div>

          <div className='media-body'>
            <h5 className='mt-0 mb-1 comment-username'>{comment.username}</h5>
            {/* <p>{comment.email}</p> */}
            <p className='comment-content'> {comment.commentText}</p>
            <p className='comment-date'>
              {moment(comment.createdAt).subtract(10, 'days').calendar()}
            </p>
            <form
              id={`replyCommentForm-${index}`}
              onSubmit={submitReplyComment(index)}
              style={{ display: 'none' }}
              className='reply-form'
            >
              <h5 className='reply-title'>Leave a comment</h5>
              <input
                type='hidden'
                value={comment._id}
                onChange={handleChangeReply('commentId')}
                name='commentId'
                className=''
              />
              <div className='form-group'>
                <input
                  type='text'
                  value={replyCommentUsername}
                  onChange={handleChangeReply('replyCommentUsername')}
                  name='replyCommentUsername'
                  placeholder='Username'
                  className=''
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  value={replyCommentEmail}
                  onChange={handleChangeReply('replyCommentEmail')}
                  name='replyCommentEmail'
                  placeholder='Email'
                  className=''
                />
              </div>
              <div className='form-group'>
                <textarea
                  value={replyCommentText}
                  onChange={handleChangeReply('replyCommentText', comment._id)}
                  type='text'
                  name='replyCommentText'
                  row={3}
                  className=''
                  placeholder='Comment...'
                />
              </div>
              <button
                className='contact-form__submitBtn'
                title='Subscribe'
                type='submit'
              >
                <span>reply</span>
              </button>
            </form>

            {comment.reply.map((reply, replyIndex) => {
              //   console.log(reply)
              return (
                <div key={replyIndex} className='media'>
                  <img
                    className='mr-3 rounded-circle'
                    src={`${DOMAIN}/static/images/n1.png`}
                    alt='Generic placeholder image'
                    style={{ width: '80px', height: '80px' }}
                  />
                  <div className='media-body'>
                    <h5 className='mt-0 mb-1 comment-username'>
                      {reply.username}
                    </h5>
                    <p className='comment-content'> {reply.replyText}</p>
                    <p className='comment-date'>
                      {moment(reply.createdAt).subtract(10, 'days').calendar()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <a
            className='reply-cmt-btn c-search-product_link'
            onClick={() => toggleReplyCommentForm(index)}
          >
            <span className='underline'>REPLY</span>
          </a>
        </li>
      );
    });
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    formData.set(name, value);
    formData.set('blogId', blog._id);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const submitComment = (e) => {
    e.preventDefault();
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    createComment(formData).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,

          error: '',
          success: `Comment created successfully`,
        });
        loadComments();
        toast.success('DONE !!!');
      }
    });
  };

  return (
    <React.Fragment>
      {head()}
      <div>
        <main>
          <article>
            <Layout
              categories={categories}
              activeSlide={blog.categories[0].name}
              singleBlog={true}
              page='layout'
            >
              <div className='container-fluid single-blog__header p-0'>
                <section className='single-blog__header-section'>
                  <div
                    className='row mx-auto single-blog__header-bg'
                    style={{
                      backgroundImage:
                        'url(' + `${API}/blog/photo/${blog.slug}` + ')',
                    }}
                  ></div>
                </section>
                <section className='single-blog__datetime-section'>
                  <div className='container'>
                    <h1 className='text-center font-weight-bold py-0 my-0 single-blog__title'>
                      {blog.title}
                    </h1>
                    <div className='single-blog__datetime-wrapper'>
                      <hr className='datetime__horizontal-line' />
                      <p className='single-blog__date-time py-0 my-0'>
                        {moment(blog.updatedAt).format('MMMM Do YYYY')}
                      </p>
                      <hr className='datetime__horizontal-line' />
                    </div>
                  </div>

                  <div className='single-blog__leading-section'>
                    <p className='single-blog__leading-text'>
                      <a href={`${DOMAIN}/blogs`}>Home</a> -{' '}
                      <a
                        href={`${DOMAIN}/categories/${blog.categories[0].slug}`}
                      >
                        {blog.categories[0].name}
                      </a>
                      - {blog.title}
                    </p>
                  </div>
                </section>
              </div>

              <div className='container'>
                <section id='blog-content'>
                  <div className='col-md-12 single-blog__content mb-40'>
                    {renderHTML(blog.body)}
                    <div className='text-center mt-5'>
                      <span className='wavy-line__container '>
                        <svg
                          id='wave'
                          version='1.1'
                          id='Layer_1'
                          viewBox='0 0 456.7 39.9'
                        >
                          <path
                            className='st69'
                            d='M4.2,33.2c0.1-0.1,7-6.9,15.9-13.8C27.7,13.7,38.7,6,47.5,6c7.5,0,14,6.6,20.3,12.9l0.4,0.4
	c6.8,6.9,14.6,14.6,24.6,14.6c9.9,0,17.7-7.8,24.5-14.6l0.5-0.5C124,12.5,130.5,6,137.9,6c7.5,0,13.9,6.5,20.2,12.9l0.4,0.4
	c6.8,6.9,14.6,14.6,24.5,14.6c10,0,17.8-7.8,24.6-14.6l0.5-0.5C214.4,12.5,220.9,6,228.4,6c7.5,0,14,6.5,20.2,12.9l0.4,0.4
	c6.8,6.9,14.5,14.6,24.5,14.6c9.9,0,17.7-7.8,24.5-14.6l0.3-0.3c6.3-6.4,12.9-13,20.5-13c7.5,0,14.1,6.6,20.4,13l0.3,0.3
    c6.8,6.9,14.6,14.6,24.5,14.6c9.9,0,17.6-7.8,24.5-14.6l0.2-0.2C395.1,12.6,401.6,6,409.2,6c8.7,0,19.8,7.7,27.3,13.4
	c8.9,6.8,15.9,13.7,16,13.8'
                          />
                        </svg>
                      </span>
                      <span className='single-blog__related-blogs py-0 my-0 mx-2'>
                        The end
                      </span>
                      <span className='wavy-line__container'>
                        <svg
                          id='wave'
                          version='1.1'
                          id='Layer_1'
                          viewBox='0 0 456.7 39.9'
                        >
                          <path
                            className='st69'
                            d='M4.2,33.2c0.1-0.1,7-6.9,15.9-13.8C27.7,13.7,38.7,6,47.5,6c7.5,0,14,6.6,20.3,12.9l0.4,0.4
	c6.8,6.9,14.6,14.6,24.6,14.6c9.9,0,17.7-7.8,24.5-14.6l0.5-0.5C124,12.5,130.5,6,137.9,6c7.5,0,13.9,6.5,20.2,12.9l0.4,0.4
	c6.8,6.9,14.6,14.6,24.5,14.6c10,0,17.8-7.8,24.6-14.6l0.5-0.5C214.4,12.5,220.9,6,228.4,6c7.5,0,14,6.5,20.2,12.9l0.4,0.4
	c6.8,6.9,14.5,14.6,24.5,14.6c9.9,0,17.7-7.8,24.5-14.6l0.3-0.3c6.3-6.4,12.9-13,20.5-13c7.5,0,14.1,6.6,20.4,13l0.3,0.3
    c6.8,6.9,14.6,14.6,24.5,14.6c9.9,0,17.6-7.8,24.5-14.6l0.2-0.2C395.1,12.6,401.6,6,409.2,6c8.7,0,19.8,7.7,27.3,13.4
	c8.9,6.8,15.9,13.7,16,13.8'
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className='row mx-0 single-blog__content-tags'>
                    <div className='col-8 col-md-6'>{showBlogTags(blog)}</div>
                    <div className='col-4 col-md-2 ml-auto is-inview'>
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
                    </div>
                  </div>
                  <div className='row mx-0 single-blog__author-desc mb-40'>
                    <div className='col-12 col-md-2'>
                      <a
                        className='info-section__url'
                        style={{ borderRight: '1px solid black' }}
                      >
                        <img
                          src={`${DOMAIN}/static/images/avatarEdited.jpg`}
                          alt='Matthew'
                          className='info-section__avatar--img '
                        />
                      </a>
                    </div>
                    <div className='col-12 col-md-9 mr-auto'>
                      <h5
                        className='info-section__name'
                        style={{ fontSize: '22px' }}
                      >
                        Matthew Tran
                      </h5>
                      <h6 className='info-section__job'>Web developer</h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Mollitia, dolorum error explicabo laudantium, corporis
                        nobis asperiores modi itaque reiciendis natus
                        praesentium accusantium! Sequi aliquam officia corporis
                        ea ad, amet vitae!
                      </p>
                    </div>
                  </div>
                  <div className='container pb-5'>
                    <div className='row mx-auto'>
                      <h4 className='comment-title mb-20'>Comments</h4>
                      <div className='col-md-12'>
                        <ul className='list-unstyled'>{showBlogComments()}</ul>
                      </div>
                    </div>
                    <div className='container pb-5 w-75 ml-0 mr-auto comment-form-wrapper'>
                      <hr />
                      <form onSubmit={submitComment} className='reply-form'>
                        <h5 className='reply-title'>Leave a comment</h5>
                        <div className='form-group'>
                          <input
                            type='text'
                            value={username}
                            onChange={handleChange('username')}
                            name='username'
                            placeholder='Username'
                            className=''
                          />
                        </div>
                        <div className='form-group'>
                          <input
                            type='text'
                            value={email}
                            onChange={handleChange('email')}
                            name='email'
                            placeholder='Email'
                            className=''
                          />
                        </div>
                        <div className='form-group'>
                          <textarea
                            value={commentText}
                            onChange={handleChange('commentText')}
                            type='text'
                            name='comment'
                            row={3}
                            className=''
                            placeholder='Comment...'
                          />
                        </div>
                        <button
                          className='contact-form__submitBtn'
                          title='Subscribe'
                          type='submit'
                        >
                          <span>SEND</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              </div>

              <div className='container py-5'>
                <div className='single-blog__relatedBlogs-wrapper mb-3'>
                  <hr className='relatedBlogs__horizontal-line' />
                  <p className='single-blog__related-blogs py-0 my-0'>
                    Related Blogs
                  </p>
                  <hr className='relatedBlogs__horizontal-line' />
                </div>

                <div className='row mx-auto'>
                  <div className='card-group'>{showRelatedBlogs()}</div>
                </div>
              </div>
            </Layout>
          </article>
        </main>
      </div>
    </React.Fragment>
  );
};

//this will get slug before client side was rendered so we can only access slug parameter through query instead of router
//router is used when client side was rendered successfully
// SingleBlog.getInitialProps = ({ query }) => {
//   return readBlog(query.slug).then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       return { blog: data, query };
//     }
//   });
// };
SingleBlog.getInitialProps = async ({ query }) => {
  let blog;
  let categoriesList;
  try {
    blog = await readBlog(query.slug);
    categoriesList = await singleCategory(query.slug);
  } catch (error) {
    console.log(error);
    // next(error)
  }
  return { blog, query, categories: categoriesList.listCategories };
};

export default withRouter(SingleBlog);
