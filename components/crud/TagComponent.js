import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/authAction';
import { createTag, getTags, removeTag } from '../../actions/tagAction';

const TagComponent = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    reload: false,
    tags: [],
    removed: false,
  });
  const { name, error, reload, tags, removed, success } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((tag, index) => {
      return (
        <button
          title='Double click to delete'
          onDoubleClick={() => deleteConfirm(tag.slug)}
          key={index}
          className='btn btn-outline-primary mr-1 ml-1 mt-3'
        >
          {tag.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Delete ?');
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    //why have to {name} => because when pass to create method
    // receive like this: name:'react'
    // fit with extraction in backend
    // {name} === name : 'name'
    createTag({ name }, token).then((data) => {
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
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const showSuccess = () => {
    if (success) {
      console.log('success: ', success);
      return <p className='text-success'>Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      console.log('error: ', error);
      return <p className='text-danger'>Tag already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      console.log('removed: ', removed);
      return <p className='text-danger'>Tag is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };
  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Create
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </React.Fragment>
  );
};

export default TagComponent;
