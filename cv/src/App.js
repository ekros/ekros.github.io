import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NoteOnSide>Made with ReactJS and vanilla CSS</NoteOnSide>
        <header>
          <Avatar />
          <Title>Eric Ros, Front-end developer</Title>
        </header>
        <Section>
          Skills
        </Section>
          <SkillBar label="Javascript" value={100} />
          <SkillBar label="ReactJS" value={100} />
          <SkillBar label="HTML / CSS / SASS" value={100} />
          <SkillBar label="Git" value={80} />
          <SkillBar label="Typescript" value={70} />
          <SkillBar label="NodeJS / MeteorJS" value={60} />
          <SkillBar label="System administration" value={50} />
          <SkillBar label="React Native" value={40} />
          <SkillBar label="Design" value={35} />
          <SkillBar label="Ruby On Rails" value={30} />
          <SkillBar label="Java" value={25} />
          <SkillBar label="C/C++" value={20} />
        <Section>Experience</Section>
          <br /><br />
          <ExperienceNode lineDelay={0} label="Technician / Team leader" year="2006" />
          <ExperienceNode lineDelay={1} label="Java / C++ developer" year="2008" />
          <ExperienceNode lineDelay={2} label="Fullstack dev and IT officer" year="2009" />
          <ExperienceNode lineDelay={3} label="Front-end dev" year="2016" />
          <ExperienceNode lineDelay={4} label="" year="today" isLast />
        <Section>Education</Section>
          TODO: add some cool animation of electronics.. maybe a gif
          Telecomunications and electronics engineering (Universitat Politécnica de Catalunya)
        <Section>Languages</Section>
          TODO: add an audio sample for every non-native language!!
          <h4>Native</h4>
          <p className="lang">Spanish <img src="es.jpeg" /></p>
          <p className="lang">Catalan <img src="cat.jpeg" /></p>
          <h4>High</h4>
          <p className="lang">English <img src="en.jpeg" /></p>
          <h4>Beginner</h4>
          <p className="lang">Dutch <img src="nl.jpeg" /></p>
        <Section>Interests</Section>
        <InterestPie interests={[
            {
              label: "Game development",
              weight: 0.2,
              color: "palegreen"
            },
            {
              label: "Creative writing",
              weight: 0.2,
              color: "crimson"
            },
            {
              label: "Design",
              weight: 0.2,
              color: "deepskyblue"
            },
            {
              label: "Traveling",
              weight: 0.2,
              color: "navy"
            }
          ]}/>
        <footer>Contact</footer>
      </div>
    );
  }
}

const NoteOnSide = ({ children }) => (
  <div className="NoteOnSide">{children}</div>
);

const Avatar = () => (
    <img className="Avatar" src="es.jpeg" alt="" />
);

const Title = ({ children }) => (
    <div className="Title">{children}</div>
);

const Section = ({ children }) => (
    <div className="Section">
      <h3>{children}</h3>
    </div>
);

const SkillBar = ({ label, value }) => (
  <div style={{
      width: `${value}%`,
      filter: `hue-rotate(${value/20}deg) opacity(${value + 50}%)`
    }}
    className="Skillbar">{label}</div>
);

// TODO-ING: trigger timeline animation only when is visible
const ExperienceNode = ({ isLast, label, lineDelay, year }) => (
  <div className="ExperienceNode">
    {
      !isLast ?
      <div style={{ animationDelay: `${lineDelay}s` }} className="ExperienceNode__line" /> : null
    }
    <div className="ExperienceNode__node" />
    <div className="ExperienceNode__label">{label}</div>
    <div className="ExperienceNode__year">{year}</div>
  </div>
);

class InterestPie extends React.Component {
  constructor(props) {
    super(props);
    this.pie = React.createRef();
  }
  componentDidMount() {
    const { interests } = this.props;
    const c = this.pie.current;
    const ctx = c.getContext("2d");
    let lastAngle = 0;
    interests && interests.forEach(interest => {
      const { label, weight, color } = interest;
      const angle = (2 * Math.PI) * weight;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(150, 150, 150, lastAngle, lastAngle + angle);
      ctx.lineTo(150, 150);
      ctx.fill();
      ctx.closePath();
      lastAngle += angle;
    });
  }
  render() {
    const { interests } = this.props;
    return (
      <div style={{ display: "flex", width: "600px", height: "300px" }}>
        <canvas ref={this.pie} width="300" height="300"></canvas>
        <div style={{ width: "300px", height: "300px" }}>
          {
            interests && interests.map(interest => (
              <div style={{ color: interest.color, fontSize: "30px", fontWeight: "bold" }}>{interest.label}</div>
            ))
          }
        </div>
      </div>
    )
  }
};

InterestPie.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    weight: PropTypes.number, // 0 to 1
    color: PropTypes.string
  }))
};

export default App;
