import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { listAdminBlogs, removeAdminBlog } from '../../actions/blogAction';
import moment from 'moment';

const AdminBlogsComponent = () => {
  const [adminBlogs, setAdminBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadAdminBlogs();
  }, []);

  const loadAdminBlogs = () => {
    listAdminBlogs(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAdminBlogs(data);
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete your blog');
    if (answer) {
      removeAdminBlog(slug, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          loadAdminBlogs();
        }
      });
    }
  };

  const showAllAdminBlogs = () => {
    return adminBlogs.map((blog, index) => (
      <div className={index === 0 ? 'mt-3' : 'mt-5'} key={index}>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h3 className='text-dark text-decoration-none'>{blog.title}</h3>
          </a>
        </Link>
        <p className='mark'>
          Written by {blog.postedBy.name} | Published on{' '}
          {moment(blog.updatedAt).format('MMMM Do YYYY')}
        </p>
        <button
          className='btn btn-sm btn-danger'
          onClick={() => {
            deleteConfirm(blog.slug);
          }}
        >
          Delete
        </button>
        <Link href={`/admin/update/blog/${blog.slug}`}>
          <a className='ml-5 btn btn-sm btn-warning'>
            Update
          </a>
        </Link>
      </div>
    ));
  };
  return (
    <React.Fragment>
      <div className='container'>
        <div className='row mx-auto'>
          <div className='col-md-12'>
          {message && <div className="alert alert-warning">
              {message}
          </div>
          }
          {showAllAdminBlogs()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminBlogsComponent;
