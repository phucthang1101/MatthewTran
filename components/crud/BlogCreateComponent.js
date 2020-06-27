import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { getCategories } from '../../actions/categoryAction';
import { getTags } from '../../actions/tagAction';
import { createBlog } from '../../actions/blogAction';
import { QuillModules, QuillFormats } from '../../helper/quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogCreateComponent = ({ router }) => {
  const blogFormLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else return false;
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [values, setValues] = useState({
    error: '',
    //size of image or file upload error
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    showing: false,
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    showing,
    hidePublishButton,
  } = values;
  const [body, setBody] = useState(blogFormLocalStorage());
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();

    createBlog(formData, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    //console.log(e.target.value);
    const value =
      name === 'photo'
        ? e.target.files[0]
        : name === 'showing'
        ? e.target.checked
        : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = (event) => {
    // console.log(event);
    setBody(event);
    formData.set('body', event);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(event));
    }
  };

  const handleCategoryToggle = (categoryId) => () => {
    setValues({ ...values, error: '' });

    // find categoryId in checkList or return -1
    const clickedCategory = checkedCategories.indexOf(categoryId);
    const all = [...checkedCategories];
    if (clickedCategory === -1) {
      all.push(categoryId);
    } else {
      all.splice(clickedCategory, 1);
    }

    setCheckedCategories(all);
    formData.set('categories', all);
  };

  const handleTagsToggle = (tagId) => () => {
    setValues({ ...values, error: '' });

    // find categoryId in checkList or return -1
    const clickedTag = checkedTags.indexOf(tagId);
    const all = [...checkedTags];
    if (clickedTag === -1) {
      all.push(tagId);
    } else {
      all.splice(checkedTags, 1);
    }

    setCheckedTags(all);
    formData.set('tags', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category, index) => {
        return (
          <li className='list-unstyled' key={index}>
            <input
              onChange={handleCategoryToggle(category._id)}
              type='checkbox'
              className='mr-2'
            />
            <label className='form-check-label'>{category.name}</label>
          </li>
        );
      })
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((tag, index) => {
        return (
          <li className='list-unstyled' key={index}>
            <input
              onChange={handleTagsToggle(tag._id)}
              type='checkbox'
              className='mr-2'
            />
            <label className='form-check-label'>{tag.name}</label>
          </li>
        );
      })
    );
  };

  const showError = () => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className='alert alert-success'
        style={{ display: success ? '' : 'none' }}
      >
        {success}
      </div>
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            value={title}
            type='text'
            className='form-control'
            onChange={handleChange('title')}
            placeholder='Title'
          />
        </div>
        <div className='form-group'>
          <ReactQuill
            value={body}
            onChange={handleBody}
            placeholder='Write something amazing...'
            modules={QuillModules}
            formats={QuillFormats}
          />
        </div>
        <div>
          <label className='text-muted'>Showing</label>
          <input
            name='showing'
            type='checkbox'
            checked={showing}
            onChange={handleChange('showing')}
          />
        </div>
        <div>
          <button className='btn btn-primary' type='submit'>
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          <h2>Blog Create</h2>
          {createBlogForm()}
          <div className='pt-3'>
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured Image</h5>
              <hr />
              <div>
                <small className='text-muted'>Max size: 1mb</small>
              </div>
              <label className='btn btn-outline-info'>
                Upload Featured Image
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleChange('photo')}
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogCreateComponent);
