import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blogAction';
import SimpleBar from 'simplebar-react';
import { API } from '../../config';

const SearchBlog = (props) => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: '',
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (event) => {
    event.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length}`,
      });
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      search: event.target.value,
      searched: false,
      results: [],
    });
  };

  const searchBlogs = (results = []) => {
    return (
      <div className='c-search-product__wrap row mx-0'>
        {results.map((blog, index) => (
          <div className='col-12 col-md-6 c-search-product' key={index}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className='text-primary c-search-product_link'>
                <img
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                  className=''
                />
                <div className='c-search-product_text'>
                  <h3>
                    <span className='underline'>{blog.title}</span>
                  </h3>
                  <p> {renderHTML(blog.excerpt)}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const searchForm = () => (
    <form className='c-search' onSubmit={searchSubmit}>
      <div className='row mx-auto'>
        <div className='col-12 col-md-9 my-4 my-md-0'>
          <input
            type='search'
            className='c-search_input js-search-input'
            placeholder='Search blogs'
            onChange={handleChange}
          />
        </div>
        <div className='col-6 mx-auto col-md-3'>
          {/* <button className='btn btn-block btn-outline-primary' type='submit'>
            Search
          </button> */}
          <button
            className='contact-form__submitBtn'
            title='Search'
            type='submit'
          >
            <span>Search</span>
            <svg className='c-arrow -right -black'>
              <svg id='arrow-right' viewBox='0 0 32 32'>
                <path className='cst0' d='M2.3 0l27.5 16L2.3 32V0z'></path>
              </svg>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className='c-search-overlay' style={{ top: props.headerHeight + 'px' }}>
      <div className='c-search_wrap'>
        <SimpleBar
          id='simepleBarSearchBlog'
          forceVisible='y'
          style={{ height: '100%' }}
        >
          <div className='SearchBlog-container'>
            {searchForm()}

            <div className='o-grid'>
              <div className='o-whole'>
                <div className={`c-search-number ${!!message ? 'is-active' : ''}`}>
                  Blog <span></span>{' '}
                  <b className='js-search-product-count'>{message ? message : 0}</b>
                </div>
                {/* {message && <p className='pt-4 text-muted font-italic'>{message}</p>} */}
                <div className='o-grid js-products-search-results'>
                  {searched && (
                    <div>
                      {searchBlogs(results)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default SearchBlog;
