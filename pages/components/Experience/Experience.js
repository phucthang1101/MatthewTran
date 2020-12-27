import React, { useEffect } from 'react';
import  initTimeline  from '../../../components/initTimeline';

const Experience = () => {
  useEffect(() => {
  
    initTimeline();
  },[]);
  return (
    <section id='experience' className='cd-horizontal-timeline experience-area '>
      <div className='row mx-0'>
        <div className='experience-title'>
          <h2>
            My <span> Experience</span>
          </h2>
        </div>
      </div>
      <div className='timeline mt-3'>
        <div className='events-wrapper'>
          <div className='events'>
            <ol>
              <li>
                <a href='#0' data-date='05/01/2016' className='selected'>
                <p>05 Sep</p><p> 2014</p>
                </a>
              </li>
              <li>
                <a href='#0' data-date='05/09/2016'>
                <p>05 Sep</p><p> 2017</p>
                </a>
              </li>
              <li>
                <a href='#0' data-date='05/12/2016'>
                <p>01 Jan</p><p> 2018</p>
                </a>
              </li>
              <li>
                <a href='#0' data-date='05/07/2017'>
                <p>01 Jan</p><p> 2019</p>
                </a>
              </li>
                </ol>

            <span className='filling-line' aria-hidden='true'></span>
          </div>
        </div>

        <ul className='cd-timeline-navigation'>
          <li>
            <a href='#0' className='prev '>
              Prev
            </a>
          </li>
          <li>
            <a href='#0' className='next '>
              Next
            </a>
          </li>
        </ul>
      </div>

      <div className='events-content'>
        <ol>
          <li className='selected' data-date='05/01/2016'>
            <h2>Vung Tau High School</h2>
            <em>September 5th, 2014</em>
            <p>
            Basic knowledge in Math,Chemistry,Physics,...First time get to know what programming is study Pascal and especially when have a chance to approach Arduino
            </p>
          </li>

          <li data-date='05/09/2016'>
            <h2>VNUHCM - University of Science</h2>
            <em>September 5th, 2017</em>
            <p>
            Major: Software Engineer.<br/>
            Subjects studied: System Operating, Web Developer(basic), Windows Application Programming(C#),Computer Networking,...
            </p>
          </li>
          <li data-date='05/12/2016'>
            <h2>Dai Duong Telecom</h2>
            <em>November 1st, 2017</em>
            <p>
            Electrician/Tester/Staff <br/>
            Testing and packing device, measure and repair  damaged resistance
            </p>
          </li>

          <li data-date='05/07/2017'>
            <h2>YinYang Workshop</h2>
            <em>November 20th, 2018</em>
            <p>
            Part-time Junior .NET Developer. <br/>
             Start learning to develope a website in the backend with C# and use database MSSQL then practice HTML, CSS, JS and Bootstrap to build responsive and cool UI/UX
            </p>
          </li>

         </ol>
      </div>
    </section>
  );
};

export default Experience;
