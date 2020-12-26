import React, { useEffect, useState, useCallback } from 'react';
import Modal from '../../../components/Lightbox/Modal';
import Button from '../../../components/Lightbox/Button';
// npm install --save-dev @iconify/react @iconify/icons-zmdi
import { Icon, InlineIcon } from '@iconify/react';
import filterCenterFocus from '@iconify/icons-zmdi/filter-center-focus';
import bxLinkExternal from '@iconify/icons-bx/bx-link-external';
import { DOMAIN } from '../../../config';

function filterSelection(c) {
  var btnContainer = document.getElementById('myBtnContainer');
  var btns = btnContainer.getElementsByClassName('btn');
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      var current = document.getElementsByClassName('active');
      current[0].className = current[0].className.replace(' active', '');
      this.className += ' active';
    });
  }
  var x, i;
  x = document.getElementsByClassName('grid-item');
  if (c == 'all') {
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], 'visible');
      w3RemoveClass(x[i], 'hidden');
      w3AddClass(x[i], 'all');
    }
  } else {
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], 'all');
      w3RemoveClass(x[i], 'visible');
      w3AddClass(x[i], 'hidden');
      if (x[i].className.indexOf(c) > -1) {
        w3RemoveClass(x[i], 'hidden');
        w3AddClass(x[i], 'visible');
      }
    }
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ' ' + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}

const Portfolio = () => {
  const [showLightBox, setShowLightBox] = useState(false);
  const [project, setProject] = useState();
  const [headerName,setHeaderName] = useState();
  const openLightBoxHandler = (projectName,name) => {
   // console.log(projectName)
    setShowLightBox(true);
    setProject(name);
    setHeaderName(projectName);
  };

  const closeLightBoxHandler = () => setShowLightBox(false);

  useEffect(() => {
    filterSelection('all');
  }, []);

  // const filterSelection = useCallback((type)=>{
  //   console.log('type: ',type)
  // })
  return (
    <React.Fragment>
      <Modal
        projectName={project}
        show={showLightBox}
        onCancel={closeLightBoxHandler}
        header={headerName}
        contentclassName='place-item__modal-content'
        footerclassName='place-item__modal-actions'
        footer={<Button onClick={closeLightBoxHandler}>CLOSE</Button>}
      >
        <div className='map-container'>
          <h1>Test lightbox</h1>
        </div>
      </Modal>
      <section
       
        className='portfolio-area dark-version portfolio-one bg-color-3 section-padding clearfix'
      
        style={{background:'#c5c5c5'}}
      >
        <div id='portfolio' className='service-title p-80'>
              <h2>
                My <span>PORTFOLIO </span>
              </h2>
              <div className='horizontal-line'>
                <div className='top'></div>
                <div className='bottom'></div>
              </div>
            </div>
        <div id='myBtnContainer'>
          <button
            className='btn project-filter-btn active'
            onClick={() => filterSelection('all')}
          >
            {' '}
            ALL<span></span>
          </button>
          <button
            className='btn project-filter-btn'
            onClick={() => filterSelection('asp')}
          >
            {' '}
            ASP.NET MVC<span></span>
          </button>
          <button
            className='btn project-filter-btn'
            onClick={() => filterSelection('reactjs')}
          >
            REACTJS<span></span>
          </button>
          <button
            className='btn project-filter-btn'
            onClick={() => filterSelection('nodejs')}
          >
            NODEJS<span></span>
          </button>
          <button
            className='btn project-filter-btn'
            onClick={() => filterSelection('mernStack')}
          >
            MERN STACK<span></span>
          </button>
        </div>
        <div className='portfolio-area container'>
          <div className='row mx-0'>
            <div className='wrapper'>
              <div className='one grid-item yurivisa asp'>
                <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p>Website Yurivisa</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                      HTML + CSS + ASP.NET MVC + MSSQL <br />
                      (01/2019 - 05/2019)
                    </p>
                  </div>
                  <div
                    className='items price'
                    onClick={() => openLightBoxHandler('Website Yurivisa','yurivisa')}
                  >
                    <a>
                      <span
                        className='iconify'
                        data-icon='zmdi-filter-center-focus'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                  <div className='items cart'>
                    {/* <i className="fa fa-external-link" aria-hidden="true"></i> */}
                    <a>
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                    <p>Used : 04/2019 - 12/2019</p>
                    <a href='https://github.com/phucthang1101/YuriVisa_V2'>
                      <span
                        className='iconify'
                        data-icon='ant-design:github-outlined'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='two grid-item daidung asp'>
                <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p>Website DaiDung</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                      HTML + CSS + JS + ASP.NET MVC + MSSQL <br />
                      (12/2018 - 03/2019)
                    </p>
                  </div>
                  <div
                    className='items price'
                    onClick={() => openLightBoxHandler('Website DaiDung','daidung')}
                  >
                    <a>
                      <span
                        className='iconify'
                        data-icon='zmdi-filter-center-focus'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                  <div className='items cart'>
                    {/* <i className="fa fa-external-link" aria-hidden="true"></i> */}
                    <a href='daidung.com.vn'>
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                    <a title='Private Repository'>
                      <span
                        className='iconify'
                        data-icon='ant-design:github-outlined'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='three grid-item vibotani asp'>
                <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p>Website ViBotani</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                      HTML + CSS + JS + ASP.NET MVC + MSSQL <br />
                      (06/2019 - 10/2019)
                    </p>
                  </div>
                  <div
                    className='items price'
                    onClick={() => openLightBoxHandler('Website Vibotani','vibotani')}
                  >
                    <a>
                      <span
                        className='iconify'
                        data-icon='zmdi-filter-center-focus'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                  <div className='items cart'>
                    {/* <i className="fa fa-external-link" aria-hidden="true"></i> */}
                    <a>
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                    <a href='https://github.com/phucthang1101/ViBotani'>
                      <span
                        className='iconify'
                        data-icon='ant-design:github-outlined'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='four grid-item homeRepair mernStack'>
                <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p> Home Repair & Maintainance</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                    MongoDB + ExpressJS + ReactJS + NodeJS + NextJS (SSR)
                      (In Progress)
                    </p>
                  </div>
                  <div
                    className='items price'
                    onClick={() => openLightBoxHandler('Home Repair & Maintenance','homeRepair')}
                  >
                    <a>
                      <span
                        className='iconify'
                        data-icon='zmdi-filter-center-focus'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                  <div className='items cart'>
                    {/* <i className="fa fa-external-link" aria-hidden="true"></i> */}
                    <a>
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                    <a href='https://github.com/phucthang1101/house_maintenance'>
                      <span
                        className='iconify'
                        data-icon='ant-design:github-outlined'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='five grid-item ExpenseApp mernStack'>
                <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p>Frist MERN App: Expense Tracker</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                      MongoDB + ExpressJS + ReactJS + NodeJS <br />
                      (01/2020 - 02/2020)
                    </p>
                  </div>
                  <div
                    className='items price'
                    onClick={() => openLightBoxHandler('Expense Tracker ','expenseTracker')}
                  >
                    <a href='https://mysterious-cliffs-96399.herokuapp.com/'>
                      <span
                        className='iconify'
                        data-icon='zmdi-filter-center-focus'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                  <div className='items cart'>
                    {/* <i className="fa fa-external-link" aria-hidden="true"></i> */}
                    <a>
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                    <a href='https://github.com/phucthang1101/expense_tracker'>
                      <span
                        className='iconify'
                        data-icon='ant-design:github-outlined'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='six grid-item personalWebsite reactjs'>
              <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p>MERN App: Personal Blog</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                      MongoDB + ExpressJS + ReactJS + NodeJS + NextJS<br />
                      (05/2020 - 08/2020)
                    </p>
                  </div>
                  <div
                    className='items price'
                   
                  >
                   <a href={`${DOMAIN}/blogs`} title="Matthew's Blog">
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                  </div>
                  
                </div>
               </div>

              <div className='seven grid-item locationSharing mernStack'>
                <div className='overlay'>
                  <div className='items'></div>
                  <div className='items head'>
                    <p>MERN Stack App: Location Sharing</p>
                  </div>
                  <div className='items subhead'>
                    <p>
                      MongoDB + ExpressJS + ReactJS + NodeJS <br />
                      (04/2020 - 05/2020)
                    </p>
                  </div>
                  <div
                    className='items price'
                    onClick={() => openLightBoxHandler('Location Sharing','locationSharing')}
                  >
                    <a>
                      <span
                        className='iconify'
                        data-icon='zmdi-filter-center-focus'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                  <div className='items cart'>
                    {/* <i className="fa fa-external-link" aria-hidden="true"></i> */}
                    <a href='https://thangtran-c9a5a.firebaseapp.com/'>
                      <span
                        className='iconify'
                        data-icon='bx:bx-link-external'
                      ></span>
                    </a>
                    <a href='https://github.com/phucthang1101/location_sharing'>
                      <span
                        className='iconify'
                        data-icon='ant-design:github-outlined'
                        data-inline='false'
                      ></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

// // Add active class to the current control button (highlight it)
// var btnContainer = document.getElementById("myBtnContainer");
// console.log(btnContainer)
// var btns = btnContainer.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }
export default Portfolio;
