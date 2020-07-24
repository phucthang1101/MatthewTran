import React, { useEffect, useRef, useState } from 'react';
import { emailContactForm } from '../../../actions/formAction';
import { ToastContainer, toast } from 'react-toastify';

toast.configure();

const Contact = () => {
  const contactTitleRef = useRef(null);
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false,
  });
  const { message, name, email, sent, buttonText, success, error } = values;

  useEffect(() => {
    document.getElementById('contact-wrapper').style.marginTop =
      contactTitleRef.current.clientHeight + 'px';
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Sending...' });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        toast.error(data.error);
      } else {
        setValues({
          ...values,
          sent: true,
          name: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success,
        });
        if (data.success) {
          toast.success('Thank you for contacting me ^^');
        }
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: 'Send Message',
    });
  };

  return (
    <section id='contact' className='contact_section '>
      <div className='container'>
        <div className='row mx-auto'>
          <div className='col-xs-12 col-sm-6 col-md-4'>
            <div className='left'>
              <div ref={contactTitleRef} className='contact-title mb-30'>
                <h2 className='mb-15 white-color'>
                  GET IN <span>TOUCH</span>
                </h2>

                <p>Feel free to contact me. Thank you !</p>
              </div>
              <ul className='contact-text clearfix'>
                <li style={{ marginTop: '19px' }}>
                  <i className='fa fa-phone' aria-hidden='true'></i>

                  <h4 className='montserrat weight-regular no-margin capitalize'>
                    Phone
                  </h4>
                  <span>
                    <a
                      className='montserrat weight-regular'
                      href='tel:+88-669-658-6586'
                    >
                      +88 669 658 6586
                    </a>
                  </span>
                </li>
                <li>
                  <i className='fa fa-envelope' aria-hidden='true'></i>

                  <h4 className='montserrat weight-regular no-margin capitalize'>
                    Email
                  </h4>
                  <span>
                    <a
                      className='montserrat weight-regular capitalize'
                      href='mailto:phucthangvt1101@gmail.com'
                    >
                      phucthangvt1101@gmail.com
                    </a>
                  </span>
                </li>
                <li>
                  <i className='fa fa-home' aria-hidden='true'></i>

                  <h4 className='montserrat weight-regular capitalize no-margin'>
                    Location
                  </h4>
                  <span className='montserrat weight-regular capitalize'>
                    Location Name,here.US
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-xs-12 col-sm-6 col-md-8'>
            <div className='contact-wrapper' id='contact-wrapper'>
              <form
                action='#'
                method='post'
                className='contact-form'
                onSubmit={clickSubmit}
              >
                <div className='field' style={{ marginTop: '19px' }}>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Who are you?'
                    autoFocus
                    onChange={handleChange('name')}
                    value={name}
                  />
                  <label htmlFor='name'>NAME</label>
                </div>
                <div className='field'>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='name@domain.com'
                    onChange={handleChange('email')}
                    value={email}
                  />
                  <label htmlFor='email'>EMAIL</label>
                </div>
                <div className='field'>
                  <textarea
                    id='msg'
                    name='msg'
                    placeholder='You message...'
                    onChange={handleChange('message')}
                    value={message}
                  ></textarea>
                  <label htmlFor='msg'>MESSAGE</label>
                </div>
                <input className='button' type='submit' value='Send' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
