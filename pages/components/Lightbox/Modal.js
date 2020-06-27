import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';
import Slider from '../ImageSlider/Slider';
import { DOMAIN } from '../../../config';

const getSlides = (projectName) => {
  switch (projectName) {
    case 'yurivisa':
      return [
        {
          images: '../static/images/yurivisa/create1.png',
          // images:`${DOMAIN}/static/images/yurivisa/create1.png`,
          caption:
            'First time design database in MSSQL and connect to ASP.NET using Entity Framework',
        },
        {
          images: '../static/images/yurivisa/create2.png',
          caption:
            'Integrate CKEditor and CKFinder to upload file and write content for web pages',
        },
        {
          images: './static/images/yurivisa/multiLang.png',
          caption:
            'Make multi-language function without using .resx file but by database',
        },
        {
          images: './static/images/yurivisa/servicePage.png',
          caption:
            'Use HTML CSS Bootstrap4 to build UI and C# to render data into web pages',
        },
      ];

    case 'vibotani':
      return [
        {
          images: './static/images/vibotani/product_Index.png',
          caption:
            'Design database in MSSQL and connect to ASP.NET using Entity Framework',
        },
        {
          images: './static/images/vibotani/ckfinder_ckeditor.png',
          caption:
            'Integrate CKEditor and CKFinder to upload file and write content for web pages',
        },
        {
          images: './static/images/vibotani/renderPageNews.png',
          caption:
            'Use HTML CSS JS to build responsive UI and C# to render data into web pages',
        },
        {
          images: './static/images/vibotani/renderProduct.png',
          caption:
            'Use JS to add animation and work with AJAX to get data to put in Modal',
        },
      ];
    case 'daidung':
      return [
        {
          images: './static/images/daidung/Home.png',
          caption:
            'Build UI base on designed .pdf file using HTML, CSS, JS and Bootstrap.',
        },
        {
          images: './static/images/daidung/cool_css.png',
          caption:
            'Get used to with some complicate CSS skills and some JS animation.',
        },
        {
          images: './static/images/daidung/prj_resp.png',
          caption: 'Build responsive UI use Bootstrap4.',
        },
        {
          images: './static/images/daidung/paginition_multi_lang.png',
          caption:
            'Make multilanguage website,pagination in .NET, design and connect about 20 table in MSSQL.',
        },
        {
          images: './static/images/daidung/Admin_slider.png',
          caption:
            'Allow Admin to edit image, order, caption of every slide in Owl-carousel2.',
        },
      ];
    case 'todolist':
      return [
        {
          images: './static/images/employee/home2.png',
          caption:
            'Render data get from MongoDB Compass in local using Express Handlebars.',
        },
        {
          images: './static/images/employee/create.png',
          caption: 'Create mongoose Schema perform CRUD action.',
        },
        {
          images: './static/images/employee/validateEmail.png',
          caption: 'Validate Email before submitting.',
        },
      ];
    case 'locationSharing':
      return [
        {
          images: './static/images/locationSharing/SignUp.png',
          caption:
            'Use BcryptJS to hash password and Multer to upload file then sign a JWT to login.',
        },
        {
          images: './static/images/locationSharing/login.png',
          caption:
            'Check username and compare Bcrypt password then sign Token to User.',
        },
        {
          images: './static/images/locationSharing/home.png',
          caption:
            'JWT expiresIn will keep User logged in and show other Route for User to perform.',
        },

        {
          images: './static/images/locationSharing/Authorization.png',
          caption:
            'Compare userId in Token with creatorId of the place then show button to Delete and Edit.',
        },
        {
          images: './static/images/locationSharing/readData.png',
          caption:
            'If not authorized, User will only see places without deleting and editing it.',
        },
        {
          images: './static/images/locationSharing/uploadImg_create.png',
          caption:
            'Use FileReader to preview image, attach Token to header to check authorization in server.',
        },

        {
          images: './static/images/locationSharing/useHEREmap.png',
          caption:
            'Integrate HERE map to show location of place based on longitude and latitude.',
        },
        {
          images: './static/images/locationSharing/Edit.png',
          caption: 'Allow to change Title and Description only.',
        },
        {
          images: './static/images/locationSharing/Delete.png',
          caption: 'Show modal for User to confirm delete.',
        },
      ];
    case 'expenseTracker':
      return [
        {
          images: './static/images/expenseTracker/home.png',
          caption:
            'Use Axios to handle HTTP request and ContextAPI to get state and dispatch function.',
        },
        {
          images: './static/images/expenseTracker/create.png',
          caption:
            'Handle form submit and dispatch action use Axios with POST request to MongoDB Atlas.',
        },
        {
          images: './static/images/expenseTracker/delete.png',
          caption:
            'onClick dispatch action use Axios with DELETE request then useEffect will update component.',
        },
      ];
    default:
      break;
  }
};

const ModalOverlay = (props) => {
  const [modalWidth, setModalWidth] = useState(0);
  let ModalRef = useRef(null);
  let container;
  let content;
  if (typeof window !== 'undefined') {
    container = document.getElementById('modal-hook');
  }

  let slides = getSlides(props.projectName);

  content = (
    <div
      ref={(ModalRef) => {
        ModalRef && setModalWidth(ModalRef.offsetWidth);
      }}
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      {modalWidth !== 0 && <Slider fullWidth={false} modalWidth={modalWidth} slides={slides} />}
    </div>
  );

  return container && content && props.show
    ? ReactDOM.createPortal(content, container)
    : null;
};
const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames='modal'
      >
        <ModalOverlay  {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
