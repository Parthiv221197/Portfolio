import React, { Component } from 'react';
import reactimg from './assests/react.png';
import javaimg from './assests/java.png';
import jsimg from './assests/javascript.png';
import iosimg from './assests/ios.png';
import dsimg from './assests/connection.png';
import pyimg from './assests/python.png';
import './index.css';

class Skills extends Component {
    render() {
        return (
            <div className='skill'>
            <h2>Technologies I know...</h2>

            <div>
            <div style={{ display:'inline-flex',margin:60 }} >
            <p>Data Structures</p>
            </div>
            <div style={{ display:'inline-flex', margin:60 }} className="skill">
            <img src={dsimg} alt='dsimg' style={{ width: 50, height: 50, margin: 30 }} />
            </div>

            <div style={{ display:'inline-flex',margin:60 }} >
            <p>React</p>
            </div>
            <div style={{ display:'inline-flex',margin:60 }} >
            <img src={reactimg} alt='reactimg' style={{ width: 50, height: 50, margin: 30 }} />
            </div>
            </div>
            
            <div>
            <div style={{ display:'inline-flex',margin:60 }} >
            <p>JavaScript</p>
            </div>
            <div style={{ display:'inline-flex', margin:60 }} >
            <img src={jsimg} alt='jsimg' style={{ width: 50, height: 50, margin: 30 }} />
            </div>

            <div style={{ display:'inline-flex',margin:60 }} >
            <p>iOS</p>
            </div>
            <div style={{ display:'inline-flex',margin:60 }} >
            <img src={iosimg} alt='iosimg' style={{ width: 50, height: 50, margin: 30 }} />
            </div>
            </div>

            <div>
            <div style={{ display:'inline-flex',margin:60 }} >
            <p>Python</p>
            </div>
            <div style={{ display:'inline-flex', margin:60 }} className="skill">
            <img src={pyimg} alt='pyimg' style={{ width: 50, height: 50, margin: 30 }} />
            </div>

            <div style={{ display:'inline-flex',margin:60 }} >
            <p>Java</p>
            </div>
            <div style={{ display:'inline-flex',margin:60 }} >
            <img src={javaimg} alt='javaimg' style={{ width: 50, height: 50, margin: 30 }} />
            </div>
            </div>

            </div>
        )
    }
}

export default Skills;