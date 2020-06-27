import { useState, useEffect } from 'react';
import { createComment } from '../../actions/commentAction';

const Comment = ({blog}) => {
  const [values, setValues] = useState({
    error: '',

    success: '',
    formData: '',
    username: '',
    commentText: '',
  });

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
 
  }, []);

  const { error, success, formData, username, commentText } = values;

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    formData.set(name, value);
    formData.set('blogId', blog._id);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

 

  const submitComment = (e) => {
    e.preventDefault();
    for (var value of formData.values()) {
      console.log(value);
    }
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
      }
    });
  };

  return (
    <div className='container pb-5'>
      <hr />
      <form onSubmit={submitComment}>
        <h5>Leave a comment</h5>
        <div className='form-group'>
          <input
          
            type='text'
            value={username}
            onChange={handleChange('username')}
            name='username'
            placeholder='Username'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <textarea
            value={commentText}
            onChange={handleChange('commentText')}
            type='text'
            name='comment'
            row={3}
            className='form-control'
            placeholder="Comment..."
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
