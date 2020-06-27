import Layout from '../../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../../components/auth/Admin';
import BlogUpdateComponent from '../../../../components/crud/BlogUpdateComponent';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Update blog</h2>
            </div>
            <div className="col-md-12">
             <BlogUpdateComponent/>
            </div>
           
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
