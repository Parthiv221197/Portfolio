import React, { Component } from 'react';
import Projects from './Projects';
import SocialProfiles from './SocialProfiles'
import profile from './assests/Profile.jpeg';
import { Parallax } from 'react-parallax';
import CopyrightNotice from 'react-copyright-notice-component';
import Background from './assests/Background.png'
import { motion } from 'framer-motion';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import Skills from './Skills';
import Resume from './assests/Resume.jpg'
import Typical from 'react-typical';

class App extends Component {

  render() {
    return (
      <div>
        <Parallax bgImage={ Background } strength={600}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} style={{ marginTop:100, height: 1000 }}>
        <img src={profile} alt='profile' className='profile' />
        <h1>Parthiv Patel</h1>
        <h4 className="Bio">{ ' ' }
        <Typical 
        loop={Infinity}
        // wrapper='p'
        steps={[
          'Software Developer                    ',
          'Web Developer                         ',
          'Mobile Developer                         ',
          'Technical Analyst                         ',
        ]} /></h4>
            <div className="Bio">
              <p>I'm always eager to learn new stuff and looking forward to opportunities where I can use my skills.
               If you have any new ideas or thoughts and if you are willing to share them, connect with me!</p>
                <p>I am a student at Lassonde School of Engineering, York University.
                Some of my favorite languages are Java and JavaScript, I love React.js.
                Besides coding, I love music and travelling!</p>
              </div>
        </motion.div>
        </Parallax>
        <Parallax bgImage={ Resume } strength={600}>
          <h2 className="Resume">My Resume</h2>
          <div>
            <div className="one">
              <LightSpeed left>
            <h3>Education</h3>
            <h4>York University</h4>
            <p>January 2019 - Present</p>
            <p>I am a computer science student at Lassonde School Of Engineering</p>
            </LightSpeed>
            </div>
            <div className="two">
              <LightSpeed right>
              <h3>Experience</h3>
              <h4>Technical Analyst Co-op</h4>
              <h5>CIBC</h5>
              <p>January 2021 - August 2021</p>
              <p>Monitor Production and make sure that all processes are running smoothly</p>
              <h4>Lassonde Academy Coach</h4>
              <h5>York University</h5>
              <p>August 2020 - September 2020</p>
              <p>Developed and taught content to incoming first year students.</p>
              <h4>Teaching Assistant</h4>
              <h5>York University</h5>
              <p>September 2020 - Present</p>
              <p>Helped upper year students learn OOP and graded their coursework.</p>
              </LightSpeed>
            </div>
            <div className="one">
              <LightSpeed left>
            <h3>Volunteer</h3>
            <h4>CTC(Computational Thinking club) Mentor lead</h4>
            <p>January 2019 - Present</p>
            <p>Guided other mentors being a lead mentor and managed weekly activities</p>
            </LightSpeed>
            </div>
          </div>
        </Parallax>
        <div style={{ height: '50%' }}> 
        <Projects />
        <hr/>
        </div>
        <div className="Skills">
          <Fade bottom>
          <Skills />
          </Fade>
        </div>
        <div>
        <hr />
        <Fade bottom>
        <CopyrightNotice copyrightHolder="Parthiv Patel" year=""></CopyrightNotice>
        <SocialProfiles />
        </Fade>
        </div>
      </div>
    )
  }

}

export default App;
