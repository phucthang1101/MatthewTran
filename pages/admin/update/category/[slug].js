import Layout from '../../../../components/Layout';
import Link from 'next/link';
import Admin from '../../../../components/auth/Admin';
import CategoryUpdateDeleteComponent from '../../../../components/crud/CategoryUpdateComponent';

const Category = () => {
  return (
    <Layout>
      <Admin>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12 pt-5 pb-5'>
              <h2>Update Category</h2>
            </div>
            <div className='col-md-12'>
              <CategoryUpdateDeleteComponent />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Category;
