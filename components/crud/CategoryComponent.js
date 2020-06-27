import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { isAuth, getCookie } from '../../actions/authAction';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../actions/categoryAction';
import { API,DOMAIN } from '../../config';

const CategoryComponent = ({ router }) => {
  //preview image:
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    reload: false,
    categories: [],
    removed: false,
    formData: '',
    categoryDesc:''
  });
  const {
    name,
    error,
    reload,
    categories,
    removed,
    success,
    formData,
    categoryDesc
  } = values;
  const token = getCookie('token');

  useEffect(() => {
   loadCategories();
  }, [router,reload]);

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

  const loadCategories = () => {
   

    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
      //  setValues({ ...values,  });
        setValues({ ...values, categories: data,formData: new FormData() });
      }
    });
  };

  const showCategories = () => {
  
    return categories.map((category, index) => {
      return (
        <a
          title='Click to update or delete category'
          href={`${DOMAIN}/admin/update/category/${category.slug}`}
        
          key={index}
          className='btn btn-outline-primary mr-1 ml-1 mt-3'
        >
          {category.name}
          <small> {category.categoryDesc}</small>
          <div className='row mx-auto' style={{ marginTop: '-30px' }}>
            <img
              src={`${API}/category/photo/${category.slug}`}
              alt={category.name}
              className='img img-fluid'
            />
          </div>
        </a>
      );
    });
  };


  const handleChange = (name) => (e) => {
   
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
  const clickSubmit = (e) => {
    
    e.preventDefault();
    //why have to {name} => because when pass to create method
    // receive like this: name:'react'
    // fit with extraction in backend
    // {name} === name : 'name'
    createCategory(formData, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          categoryDesc:'',
          reload: !reload,
        });
      }
    });
  };

  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     name: e.target.value,
  //     error: false,
  //     success: false,
  //     removed: '',
  //   });
  // };

  const showSuccess = () => {
    if (success) {
      return <p className='text-success'>Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className='text-danger'>Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className='text-danger'>Category is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
  
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const newCategoryForm = () =>{
 
    return (
      <form onSubmit={clickSubmit}>
      <div className='form-group pb-2'>
        <h5>Featured Image</h5>
        <hr />
        <div>
          <small className='text-muted'>Max size: 1mb</small>
        </div>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>abc</p>}
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
      <div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('name')}
          value={name}
          required
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>categoryDesc</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('categoryDesc')}
          value={categoryDesc}
          required
        />
      </div>
        <button type='submit' className='btn btn-primary'>
          Create
        </button>
      </div>
    </form>
    )
   
  };

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
    
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default withRouter(CategoryComponent);
