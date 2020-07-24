import React, { useEffect } from 'react';
import  initTimeline  from './initTimeline';

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
                <a href='#0' data-date='25/01/2017' className='selected'>
                  25 May
                </a>
              </li>
              <li>
                <a href='#0' data-date='05/09/2017'>
                5 Sep
                </a>
              </li>
              <li>
                <a href='#0' data-date='20/11/2018'>
                  20 Nov
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
          <li className='selected' data-date='25/01/2017'>
            <h2>Vung Tau High School</h2>
            <em>May 25th, 2017</em>
            <p>
            Basic knowledge in Math,Chemistry,Physics,...First time get to know what programming is study Pascal and especially when have a chance to approach Arduino
            </p>
          </li>

          <li data-date='05/09/2017'>
            <h2>VNUHCM - University of Science</h2>
            <em>September 5th, 2017</em>
            <p>
            Major: Software Engineer.<br/>
            Subjects studied: System Operating, Web Developer(basic), Windows Application Programming(C#),Computer Networking,...
            </p>
          </li>

          <li data-date='20/11/2018'>
            <h2>YinYang Workshop</h2>
            <em>November 20th, 2018</em>
            <p>
            Part-time job: .NET developer. <br/>
             Start learning to develope a website in the backend with C# and use database MSSQL then practice HTML, CSS, JS and Bootstrap to build responsive and cool UI/UX
            </p>
          </li>

         </ol>
      </div>
    </section>
  );
};

export default Experience;
