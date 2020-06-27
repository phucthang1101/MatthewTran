import React, { useState, useRef, useEffect } from 'react';

const Skills = (props) => {
  const [isPerRun, setPerRun] = useState(false);
  let [count, setCount] = useState(0);
  let skillsRef = useRef(null);

  useEffect(() => {
    //  const setScrollPositionCallBack = ;
    let scrollbar = props.scrollableNodeRef.current
      ? props.scrollableNodeRef.current
      : '';
   
    if (typeof window !== 'undefined') {
      if (scrollbar !== '') {
        scrollbar.getScrollElement().addEventListener('scroll', () => {
          const scrollCheck =
            skillsRef && skillsRef.current
              ? Math.abs(skillsRef.current.getBoundingClientRect().top) >= 200
              : 0;

          //  console.log('js: ', document.getElementById('section-3').scrollTop);
          if (count <= 1 && scrollCheck !== isPerRun) {
            // console.log('in: ',count)
            setCount(++count);
            setPerRun(scrollCheck);
          }
        });
      }
      // console.log('scroll func');
    }
  });

  return (
    <section ref={skillsRef} id='skills' className='skills_div'>
      <div id='skills-bd' className='skills-area section-padding'>
        <div className='container'>
          <div className='row'>
            <div className='skills-title'>
              <h2>
                My <span>Skills</span>
              </h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='about-text-right'>
                <div id='skills'>
                  <div className='row'>
                    <div className='col-md-6 col-12'>
                      <div className='skill'>
                        <div className='skill-name'>HTML</div>
                        <div className='skill-bar '>
                          <div
                            className={`skill-per ${isPerRun ? '' : 'html5'}`}
                            per='90%'
                          ></div>
                        </div>
                      </div>
                      <div className='skill'>
                        <div className='skill-name'>CSS</div>
                        <div className='skill-bar'>
                          <div
                            className={`skill-per ${isPerRun ? '' : 'css'}`}
                            per='80%'
                          ></div>
                        </div>
                      </div>
                      <div className='skill'>
                        <div className='skill-name'>Javascript</div>
                        <div className='skill-bar'>
                          <div
                            className={`skill-per ${isPerRun ? '' : 'js'}`}
                            per='70%'
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6 col-12'>
                      <div className='skill'>
                        <div className='skill-name'>MERN Stack</div>
                        <div className='skill-bar'>
                          <div
                            className={`skill-per ${isPerRun ? '' : 'react'}`}
                            per='60%'
                          ></div>
                        </div>
                      </div>
                      <div className='skill'>
                        <div className='skill-name'>ASP .NET</div>
                        <div className='skill-bar'>
                          <div
                            className={`skill-per ${isPerRun ? '' : 'js'}`}
                            per='70%'
                          ></div>
                        </div>
                      </div>
                      <div className='skill'>
                        <div className='skill-name'>MongoDB + MSSQL</div>
                        <div className='skill-bar'>
                          <div
                            className={`skill-per ${isPerRun ? '' : 'js'}`}
                            per='70%'
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
