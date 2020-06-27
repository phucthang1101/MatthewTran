import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const CardRelatedBlog = ({ blog }) => {
  return (
    <div className='card'>
      <section className=' '>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className='img img-fluid card-img-top'
              style={{ maxHeight: 'auto', width: '100%', height: '300px' }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>
      <div className='card-body'>
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h4 className='card-title single-blog__title'>{blog.title}</h4>
            </a>
          </Link>
          <div className='card-text'>{renderHTML(blog.excerpt)}</div>
        </section>
      </div>
      <div className='card-footer'>
      <p className='single-blog__date-time'>
      {moment(blog.updatedAt).format('MMMM Do YYYY')}
      </p>

      
        {/* <Link href={`/`}>
          <a className='float-right'>{blog.postedBy.name}</a>
        </Link> */}
      </div>
    </div>
  );
};

export default CardRelatedBlog;
