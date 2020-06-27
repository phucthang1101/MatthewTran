import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import { getCategories } from '../../actions/categoryAction';
import { getTags } from '../../actions/tagAction';
import { readBlog, updateAdminBlog } from '../../actions/blogAction';
import { QuillModules, QuillFormats } from '../../helper/quill';
import { DOMAIN, API } from '../../config';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogUpdateComponent = ({ router }) => {

  const [body, setBody] = useState('');

  //preview image:
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  //categories:
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //tags:
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
    showing: '',
   
  });

  const { error, success, formData, title, showing } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const initBlog = () => {
    if (router.query.slug) {
      readBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title, showing: data.showing });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let categoriesChecked = [];
    blogCategories.map((category, index) => {
      categoriesChecked.push(category._id);
    });
    setCheckedCategories(categoriesChecked);
  };

  const setTagsArray = (blogTags) => {
    let tagsChecked = [];
    blogTags.map((tag, index) => {
      tagsChecked.push(tag._id);
    });
    setCheckedTags(tagsChecked);
  };

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

  const findCateogriesChecked = (categoryId) => {
    const result = checkedCategories.indexOf(categoryId);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findTagsChecked = (tagId) => {
    const result = checkedTags.indexOf(tagId);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category, index) => {
        return (
          <li className='list-unstyled' key={index}>
            <input
              onChange={handleCategoryToggle(category._id)}
              checked={findCateogriesChecked(category._id)}
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
              checked={findTagsChecked(tag._id)}
              type='checkbox'
              className='mr-2'
            />
            <label className='form-check-label'>{tag.name}</label>
          </li>
        );
      })
    );
  };

  const handleChange = (name) => (e) => {
    //console.log(e.target.value);
    console.log(name)
    const value =
      name === 'photo'
        ? e.target.files[0]
        : name === 'showing'
        ? e.target.checked
        : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
    if (name === 'photo') {
      let pickedFile;

      if (e.target.files && e.target.files.length === 1) {
        pickedFile = e.target.files[0];
        setFile(pickedFile);
      } else {
      }
    }
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
    formData.set('showing', showing);
  };

  const editBlog = (event) => {
    event.preventDefault();
    updateAdminBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          success: `Blog title "${data.title}" is successfully updated`,
        });
        Router.replace(`/admin/blogs`);
      }
    });
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
            Update
          </button>
        </div>
      </form>
    );
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {updateBlogForm()}
          <div className='pt-3'></div>
        </div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured Image</h5>
              <hr />
              <div>
                <small className='text-muted'>Max size: 1mb</small>
              </div>
              <div className='image-upload__preview'>
                {previewUrl && <img src={previewUrl} alt='preview' />}
                {!previewUrl && body && (
                  <img
                    src={`${API}/blog/photo/${router.query.slug}`}
                    alt={title}
                    style={{ width: '100%' }}
                  />
                )}
              </div>
              <label className='btn btn-outline-info'>
                Upload Featured Image
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleChange('photo')}
                  hidden
                  ref={filePickerRef}
                  onClick={pickImageHandler}
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

export default withRouter(BlogUpdateComponent);
