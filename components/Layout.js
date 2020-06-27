import Header from './Header';
import HeaderAdmin from './HeaderAdmin';
import Footer from './Footer';
import SimpleBar from 'simplebar-react';
import { Head } from 'next/document';
const scrollableNodeRef = React.createRef();

const Layout = (props) => {
  return (
    <React.Fragment>
    
      <SimpleBar
        ref={scrollableNodeRef}
        id='simepleBar'
        style={{ height: '100vh' }}
      >
        {props.categories ? (
          <Header scrollableNodeRef={scrollableNodeRef} {...props} />
        ) : (
          <HeaderAdmin {...props} />
        )}

        {props.children}
        <Footer scrollableNodeRef={scrollableNodeRef} />
      </SimpleBar>
    </React.Fragment>
  );
};

export default Layout;
