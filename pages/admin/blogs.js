import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';
import AdminBlogsComponent from '../../components/crud/AdminBlogsComponent';

const AdminBlogs = () => {
  return (
    <Layout>
      <Admin>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5'>
              <h2>Matthew's All Blogs</h2>
            </div>
            <div className="col-md-12">
             <AdminBlogsComponent/>
            </div>
           
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminBlogs;
