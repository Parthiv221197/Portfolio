import React, { Component } from 'react';
import PROJECTS from './data/projects';
import Fade from 'react-reveal/Fade';
import Button from 'react-bootstrap/Button'

class Project extends Component {

    render() {
        const { title, image, description, github, link } = this.props.project;
        return (
            <div className="Projects" >
                <h3><Fade bottom cascade>{title}</Fade></h3>
                <p><Fade bottom cascade>{description}</Fade></p>
                <Fade bottom cascade><img src={image} alt='profile' style={{ width: 200, height: 150, padding:30 }}/></Fade>
                <Fade bottom cascade>
                <div>
                <Button style={{ margin:20 }} onClick={(e) => {
                    e.preventDefault();
                    window.open(github,'_blank');
                    }}>View Code</Button>
                <Button style={{ margin:20 }} onClick={(e) => {
                    e.preventDefault();
                    window.open(link,'_blank');
                    }}>Live Demo</Button>
                </div>
                </Fade>
            </div>
        )
    }
}

class Projects extends Component {
    render() {
        return (
            <div>
                <h2><Fade bottom cascade>My Projects...</Fade></h2>
                <div>
                    {
                        PROJECTS.map(PROJECT => {
                            return (
                                <Project key={PROJECT.id} project={PROJECT} />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Projects;