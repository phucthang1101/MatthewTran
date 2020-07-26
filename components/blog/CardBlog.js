import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { useEffect, useRef } from 'react';

const CardBlog = (props) => {
 const { blog } = props
  const headerBlog = useRef(null);

  useEffect(() => {
   // console.log(headerBlog.current.clientHeight)
   // console.log(key)
    props.getHeightHeader(headerBlog.current.clientHeight)
    
  })

  const showBlogCategories = (blog) =>
    blog.categories.map((category, index) => {
      return (
        <Link key={index} href={`/categories/${category.slug}`}>
          <p className='moment-month'>{category.name}</p>
        </Link>
      );
    });

  const showBlogTags = (blog) =>
    blog.tags.map((tag, index) => {
      return (
        <Link key={index} href={`/tags/${tag.slug}`}>
          <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>{tag.name}</a>
        </Link>
      );
    });

  return (
    <React.Fragment>
      <div className='card-blog__header'>
        <div ref={headerBlog} className='row mx-auto card-blog__header-info'>
          <div className='col-12 col-md-2 card-blog__header--moment'>
            <div className='moment-day'>
              {moment(blog.createdAt).toObject().date}
            </div>
            <div className='moment-month'>
              {moment(blog.createdAt).format('MMMM')}
            </div>
          </div>
          <div className='col-12 col-md-10 card-blog__header--url'>
            <h2 className='url-title'>
              <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </h2>
            <div className='card-blog__header--category '>
              {showBlogCategories(blog)}
            </div>
          </div>
        </div>
        <div className='card-blog__thumbnail'>
          <Link href={`/blogs/${blog.slug}`}>
            <img
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              className=''
            />
          </Link>
        </div>
        <div className='card-blog__desc'>
          <div className='card-blog-desc__excerpt'>
            {renderHTML(blog.excerpt)}
          </div>
          <div className='card-blog-desc__readmoreBtn'>
            <Link href={`/blogs/${blog.slug}`}>
              <a className='readmoreBtn'>
                <span className='readmoreBtn__hoverEffect'>Read More</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardBlog;
{
  /* <div className='lead pb-4'>
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className=' pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className='mark ml-1 pt-2 pb-2'>
          Written by {blog.postedBy.name} | Published in{' '}
          {moment(blog.updatedAt).format('MMMM Do YYYY')}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
        <br />
      </section>
      <section>
        <div className='row'>
          <div className='col-md-4'>
            <section>
              <img
                className='img img-fluid'
                style={{ maxHeight: 'auto', width: '100%' }}
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
            </section>
          </div>
          <div className='col-md-8'>
            <section>
              <div className='pb-3'>{renderHTML(blog.excerpt)}</div>

              <Link href={`/blogs/${blog.slug}`}>
                <a className='btn btn-primary pt-2'>Read more</a>
              </Link>
            </section>
          </div>
        </div>
      </section>
    </div>
  ); */
}
