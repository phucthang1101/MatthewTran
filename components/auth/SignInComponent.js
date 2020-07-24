import { useState,useEffect } from 'react';
import { signin,authenticate,isAuth } from '../../actions/authAction';
import Router from 'next/router';

const SignInComponent = () => {
  const [values, setValues] = useState({
   
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  //componentDidUpdate
  useEffect(() => {
    isAuth() && Router.push('/')
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
  
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });

      } else {
          // save user token to cookie
          //save user info to localStorage
          //authenticate user
          authenticate(data,()=>{
          if(isAuth() && isAuth().role === 1)
          {
            Router.push(`/admin`)
          } 
          else
          {
            Router.push(`/user`)
          } 
          })
        
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => {
    return loading ? <div className='alert alert-info'>Loading...</div> : '';
  };

  const showError = () => {
    return error ? <div className='alert alert-danger'>{error}</div> : '';
  };

  const showMessage = () => {
    return message ? <div className='alert alert-info'>{message}</div> : '';
  };

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        
        <div className='form-group'>
          <input
            value={email}
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            placeholder='Type your email'
          />
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            placeholder='Type your password'
          />
        </div>
        <div>
          <button className='btn btn-primary'>Sign In</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SignInComponent;
