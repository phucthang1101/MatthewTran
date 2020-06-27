import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authAction';
import {
  updateCategory,
  singleCategory,
  removeCategory,
} from '../../actions/categoryAction';
import { DOMAIN, API } from '../../config';
import renderHTML from 'react-render-html';

const CategoryUpdateDeleteComponent = ({ router }) => {
  //preview image:
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    name: '',
    categoryDesc: '',
    reload: false,
  });

  const { error, success, formData, name, categoryDesc, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategory();
  }, [router, reload]);

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

  const initCategory = () => {
    if (router.query.slug) {
      // console.log('slug: ', router.query.slug);
      singleCategory(router.query.slug).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          // console.log('category: ', data.category);
          setValues({
            ...values,
            name: data.category.name,
            categoryDesc: data.category.categoryDesc,
          });
        }
      });
    }
  };

  const handleChange = (name) => (e) => {
    //console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
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

  const editCategory = (event) => {
    console.log('editCategory');
    event.preventDefault();
    updateCategory(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          categoryDesc: '',
          success: `Category is successfully updated`,
          reload: !reload,
        });
        //Router.replace(`/admin/crud/category-tag`);
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Delete ?');
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          name: '',
          categoryDesc: '',
          success: `Category is successfully deleted`,
        });
        Router.replace(`/admin/crud/category-tag`);
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className='text-success'>{success}</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className='text-danger'>{error}</p>;
    }
  };

  const updateAndDeleteCategoryForm = () => {
    return (
      <form onSubmit={editCategory}>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            value={name}
            type='text'
            className='form-control'
            onChange={handleChange('name')}
            placeholder='Name'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Description</label>
          <textarea
            value={categoryDesc}
            type='text'
            className='form-control'
            onChange={handleChange('categoryDesc')}
            placeholder='Description'
          />
        </div>

        <div>
          <button className='btn btn-primary' type='submit'>
            Update
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deleteConfirm(router.query.slug)}
          >
            Delete
          </button>
          {showSuccess()}
          {showError()}
          <div className='pb-3'>{renderHTML(categoryDesc)}</div>
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
          {updateAndDeleteCategoryForm()}
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
                {!previewUrl && router.query.slug && (
                  <img
                    src={`${API}/category/photo/${router.query.slug}`}
                    alt={name}
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
        </div>
      </div>
    </div>
  );
};

export default withRouter(CategoryUpdateDeleteComponent);
