import { useState } from 'react';
import SvgIcon from './svgIcons';
import { DOMAIN } from '../../../config';

const Services = () => {
  const turnOnHover = (e) => (e.target.classList += ' hovered');

  return (
    <section id='' className='service_area'>
      <div className='services-area ' id='service'>
        <div className='container-fluid'>
          <div className='row mx-0 mb-40'>
            <div className='service-title'>
              <h2>
                My <span>Service </span>
              </h2>
              <div className='horizontal-line'>
                <div className='top'></div>
                <div className='bottom'></div>
              </div>
            </div>
          </div>
          <div className='row mx-4'>
            <div className='col-md-3 col-sm-6 service'>
              <div
                className='service-box'
                onMouseEnter={turnOnHover}
                onTouchStart={turnOnHover}
              >
                <span className='after'></span>
                <span className='before'></span>
                <div className={`service-icon`}>
                  <SvgIcon
                    width={110}
                    className='database'
                    viewBox='0 0 512.056 512.056'
                  >
                    <g>
                      <path
                        d='M245.333,256C180.629,256,128,308.629,128,373.333s52.629,117.333,117.333,117.333s117.333-52.629,117.333-117.333
				S310.037,256,245.333,256z M295.552,359.552c-2.091,2.069-4.821,3.115-7.552,3.115s-5.461-1.045-7.552-3.115L256,335.083v102.251
				c0,5.888-4.779,10.667-10.667,10.667s-10.667-4.779-10.667-10.667V335.083l-24.448,24.448c-4.16,4.16-10.923,4.16-15.083,0
				c-4.16-4.16-4.16-10.923,0-15.083l42.645-42.645c0.981-0.981,2.176-1.771,3.477-2.325c2.603-1.088,5.547-1.088,8.149,0
				c1.323,0.533,2.496,1.323,3.477,2.325l42.645,42.645C299.712,348.629,299.712,355.371,295.552,359.552z'
                      />
                      <path
                        d='M402.048,149.824C387.221,75.968,321.387,21.333,245.333,21.333c-88.235,0-160,71.765-160,160
				c0,3.605,0.149,7.296,0.469,11.2C37.653,197.653,0,238.507,0,288c0,52.928,43.072,96,96,96c5.888,0,10.667-4.779,10.667-10.667
				c0-76.459,62.208-138.667,138.667-138.667S384,296.875,384,373.333c0,5.888,4.779,10.667,10.667,10.667
				C459.371,384,512,331.371,512,266.667C512,204.992,464.171,154.283,402.048,149.824z'
                      />
                    </g>
                  </SvgIcon>
                </div>

                <div className='service-content'>
                  <h4 className='service-content__title'>Database</h4>
                  <ul className='service-content__desc'>
                    <li>
                      Gathering information from client, analyzing, developing
                      and maintaining database.
                    </li>
                    <li>
                      Creating management methods to access efficiently to
                      information store in database.
                    </li>
                    <li>Familiar with MSSQL (T-SQL) and MongoDB(NoSQL)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-sm-6 service'>
              <div
                className='service-box'
                onMouseEnter={turnOnHover}
                onTouchStart={turnOnHover}
              >
                <span className='after'></span>
                <span className='before'></span>
                <div className='service-icon'>
                  <SvgIcon
                    width={100}
                    className='database'
                    viewBox='0 0 512.056 512.056'
                  >
                    <g>
                      <g>
                        <path
                          d='M0,0v78.747h472.615V0H0z M285.538,49.208H49.231V29.516h236.308V49.208z M354.462,49.208h-19.692V29.516h19.692V49.208z
			 M393.846,49.208h-19.692V29.516h19.692V49.208z M433.231,49.208h-19.692V29.516h19.692V49.208z'
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d='M0,98.439v374.177h472.615V98.439H0z M164.5,327.784l-13.922,13.923l-75.885-75.884l75.885-75.885l13.922,13.923
			l-61.961,61.962L164.5,327.784z M196.192,387.703l-18.231-7.452l88.615-216.615l18.231,7.452L196.192,387.703z M322.038,341.708
			l-13.922-13.923l61.961-61.961l-61.961-61.962l13.922-13.923l75.885,75.885L322.038,341.708z'
                        />
                      </g>
                    </g>
                  </SvgIcon>
                </div>
                <div className='service-content'>
                  <h4>Web Development</h4>
                  <ul className='service-content__desc'>
                    <li>
                      Creating <b>Responsive</b> frontend using HTML/CSS/JS or
                      ReactJS base on design file(.psd, .pdf).
                    </li>
                    <li>
                      Working with server-side languages NodeJS ( ExpressJS )
                      and C# ( ASP.NET MVC ) to build Backend or API.
                    </li>
                    <li>
                      Maintaining and expanding/enhancing the website once
                      built.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-sm-6 service'>
              <div
                className='service-box'
                onMouseEnter={turnOnHover}
                onTouchStart={turnOnHover}
              >
                <span className='after'></span>
                <span className='before'></span>
                <div className='service-icon'>
                  <SvgIcon
                    width={100}
                    className='database'
                    viewBox='0 0 512.056 512.056'
                  >
                    <g>
                      <g>
                        <path
                          d='M389.513,87.422c0-12.012-4.688-23.32-13.184-31.816l-42.422-42.422C325.529,4.805,313.636,0,301.8,0h-2.578v90h90.292
			L389.513,87.422L389.513,87.422z'
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d='M273.937,309.537c2.871-8.716,7.881-16.831,14.414-23.408l101.562-101.153V120h-105.4c-8.291,0-14.513-6.709-14.513-15V0
			H45C20.186,0,0,20.186,0,45v422c0,24.814,20.186,45,45,45h299.513c24.814,0,45.4-20.186,45.4-45V355.049l-16.484,16.084
			c-6.679,6.621-14.501,11.44-23.32,14.385l-47.695,15.923l-7.266,0.396c-12.012,0-23.379-5.845-30.439-15.63
			c-7.002-9.741-8.906-22.368-5.098-33.779L273.937,309.537z M75,270h149.513c8.291,0,15,6.709,15,15c0,8.291-6.709,15-15,15H75
			c-8.291,0-15-6.709-15-15C60,276.709,66.709,270,75,270z M60,225c0-8.291,6.709-15,15-15h149.513c8.291,0,15,6.709,15,15
			s-6.709,15-15,15H75C66.709,240,60,233.291,60,225z M60,345c0-8.291,6.709-15,15-15h149.513c8.291,0,15,6.709,15,15
			c0,8.291-6.709,15-15,15H75C66.709,360,60,353.291,60,345z M284.513,420c8.291,0,15,6.709,15,15c0,8.291-6.708,15-15,15h-90
			c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15H284.513z M75,180c-8.291,0-15-6.709-15-15s6.709-15,15-15h209.513
			c8.291,0,15,6.709,15,15s-6.709,15-15,15H75z'
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d='M301.111,322.808l-13.05,39.151c-1.956,5.865,3.625,11.444,9.49,9.485l39.128-13.068L301.111,322.808z' />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d='M417.609,199.307l-98.789,98.789l42.605,42.605c22.328-22.332,65.773-65.783,98.784-98.794L417.609,199.307z' />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d='M503.185,156.284c-5.273-5.303-13.037-8.335-21.27-8.335c-8.233,0-15.996,3.032-21.299,8.35l-21.797,21.797l42.598,42.598
			c11.933-11.934,20.181-20.182,21.799-21.799C514.933,187.16,514.932,168.046,503.185,156.284z'
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <g>
                          <path
                            d='M503.215,198.896c0.001,0,0.001-0.001,0.002-0.002c0.038-0.038,0.055-0.055,0.086-0.086
				C503.272,198.84,503.255,198.857,503.215,198.896z'
                          />
                          <path d='M503.303,198.808c0.048-0.048,0.104-0.104,0.133-0.133C503.406,198.705,503.351,198.76,503.303,198.808z' />
                          <path d='M503.436,198.675C503.533,198.578,503.535,198.576,503.436,198.675L503.436,198.675z' />
                        </g>
                      </g>
                    </g>
                  </SvgIcon>
                </div>
                <div className='service-content'>
                  <h4>Content Writing</h4>
                  <ul className='service-content__desc'>
                    <li>
                      Assisting marketing team in developing content for
                      advertising campaigns.
                    </li>
                    <li>
                      Have experience in writing SEO-optimized and
                      reader-friendly article.
                    </li>
                    <li>
                      <a href={`${DOMAIN}/blogs`} title="Matthew's Blog">
                        Visit my blogs to have a closer look !
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-sm-6 service'>
              <div
                className='service-box'
                onMouseEnter={turnOnHover}
                onTouchStart={turnOnHover}
              >
                <span className='after'></span>
                <span className='before'></span>
                <div className='service-icon'>
                  <SvgIcon
                    width={100}
                    className='database'
                    viewBox='0 0 512.056 512.056'
                  >
                    <g transform='matrix(-1 0 0 1 491.521 0)'>
                      <g>
                        <g>
                          <path
                            d='M442.646,48.877c-65.167-65.168-170.821-65.168-235.986-0.002c-60.305,60.306-64.686,155.227-13.375,220.704l-21.8,21.801    c-10.598-8.148-20.225-12.812-24.028-9.009l-18.393,18.392l61.696,61.694l18.392-18.391c3.802-3.804-0.861-13.431-9.009-24.028    l21.801-21.801c65.477,51.312,160.398,46.932,220.705-13.374C507.812,219.697,507.812,114.042,442.646,48.877z M235.119,77.338    c49.368-49.368,129.701-49.371,179.068-0.003c22.461,22.46,34.585,51.336,36.608,80.782h-89.477l-9.871-30.836    c-1.084-3.375-4.304-5.884-7.827-5.504c-3.546,0.124-6.581,2.586-7.424,6.039l-21.856,89.272l-30.558-104.516    c-0.89-3.043-3.499-5.257-6.635-5.644c-3.143-0.41-6.217,1.115-7.811,3.855l-27.786,47.326h-43.038    C200.536,128.667,212.661,99.797,235.119,77.338z M414.184,256.403c-49.369,49.369-129.693,49.364-179.061-0.004    c-22.881-22.881-35.018-52.417-36.69-82.434h47.654c2.81,0,5.411-1.487,6.836-3.918l20.795-35.412l33.693,115.247    c0.991,3.391,4.095,5.706,7.61,5.706c0.054,0,0.116,0,0.178,0c3.584-0.085,6.665-2.563,7.525-6.046l22.188-90.651l3.066,9.569    c1.045,3.282,4.103,5.513,7.549,5.513h95.345C449.198,203.988,437.063,233.524,414.184,256.403z'
                            data-original='#000000'
                            className='active-path'
                            fill='#000000'
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d='M148.064,351.473l-34.855-34.854L1.541,428.286c-6.528,6.529,8.737,27.693,25.944,43.764    c14.452,13.498,30.268,23.413,35.751,17.932l111.667-111.669L148.064,351.473z'
                            data-original='#000000'
                            className='active-path'
                            fill='#000000'
                          />
                        </g>
                      </g>
                    </g>
                  </SvgIcon>
                </div>
                <div className='service-content'>
                  <h4>SEO (Search Engine Optimisation) Optimize</h4>
                  <ul className='service-content__desc'>
                    <li>Understanding of search engine and ranking methods.</li>
                    <li>
                      Experience with SEO programs, such as Google Analytics .
                    </li>
                    <li>
                      Research SEO keywords to use throughout the company's
                      website and marketing materials.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
