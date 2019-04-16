import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      experience: false,
      education: false,
      languages: false,
      interests: false,
      contact: false
  };

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { scrollTop } = document.documentElement;
    const { experience, education, languages, interests, contact } = this.state;
    console.log("scroll", document.documentElement.scrollTop, experience);
    if (!experience && scrollTop > 300) {
      this.setState({ experience: true });
    } else if (!interests && scrollTop > 1630) {
      this.setState({ interests: true });
    }
  };

  render() {
    const { experience, education, languages, interests, contact } = this.state;
    return (
      <div className="App">
        <NoteOnSide>Made with ReactJS and vanilla CSS</NoteOnSide>
        <header>
          <Avatar />
          <Title>Eric Ros, Front-end developer</Title>
          <Subtitle><SubtitleLabel>Demos</SubtitleLabel> <SubtitleContent><a href="https://codepen.io/ekros/" target="_blank">Codepen</a></SubtitleContent></Subtitle>
          <Subtitle><SubtitleLabel>Open-source projects</SubtitleLabel><SubtitleContent><a href="https://github.com/ekros/nice-react-layout" target="_blank">Nice React Layout</a> | <a href="https://github.com/ekros/react-play-editor">React Play Editor</a></SubtitleContent></Subtitle>
          <Subtitle><SubtitleLabel>Email</SubtitleLabel><SubtitleContent><a href="mailto:ericrosbh@gmail.com">ericrosbh@gmail.com</a></SubtitleContent></Subtitle>
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
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={0} company="Acer" label="Technician-Team leader" year="2006" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={1} company="Abiquo" label="Java & C++ developer" year="2008" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={2} company="ACB" label="Web dev and IT officer" year="2009" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={3} company="Dorna Sports" label="Front-end developer" year="2016" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={4} company="[Your company here]" label="" year="today" isLast />
        <Section>Education</Section>
          <i className="fas fa-broadcast-tower fa-lg" />{"  "}
          Telecomunications and electronics engineering (Universitat Politécnica de Catalunya)
        <Section>Languages</Section>
          <h4>Native</h4>
          <p className="lang">Spanish <img src="es.jpeg" /></p>
          <p className="lang">Catalan <img src="cat.jpeg" /></p>
          <h4>High</h4>
          <p className="lang">English <img src="en.jpeg" /></p>
          <h4>Beginner</h4>
          <p className="lang">Dutch <img src="nl.jpeg" /></p>
        <Section>Interests</Section>
        <InterestPie className={interests ? "InterestPie__pie--animate" : ""} interests={[
            {
              label: "Creative writing",
              weight: 0.3,
              color: "gold"
            },
            {
              label: "Game development",
              weight: 0.2,
              color: "palegreen"
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
            },
            {
              label: "Cats",
              weight: 0.1,
              color: "crimson"
            }
          ]}/>
      </div>
    );
  }
}

const NoteOnSide = ({ children }) => (
  <div className="NoteOnSide">{children}</div>
);

const Avatar = () => (
    <img className="Avatar" src="https://avatars1.githubusercontent.com/u/4777759?s=460&v=4" alt="" />
);

const Title = ({ children }) => (
    <div className="Title">{children}</div>
);

const Subtitle = ({ children }) => (
    <div className="Subtitle">{children}</div>
);

const SubtitleLabel = ({ children }) => (
  <div className="SubtitleLabel">{children}</div>
);

const SubtitleContent = ({ children }) => (
  <div className="SubtitleContent">{children}</div>
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

const ExperienceNode = ({ className, company, isLast, label, lineDelay, year }) => (
  <div className={`ExperienceNode`}>
    {
      !isLast ?
      <div style={{ animationDelay: `${lineDelay}s` }} className={`ExperienceNode__line ${className}`} /> : null
    }
    <div className="ExperienceNode__node" />
    <div className="ExperienceNode__company">{company}</div>
    <div className="ExperienceNode__label">{label || "-"}</div>
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
    const { className, interests } = this.props;
    return (
      <div style={{ display: "flex", justifyContent: "center", height: "300px" }}>
        <canvas ref={this.pie} width="300" height="300" className={`InterestPie__pie ${className}`}></canvas>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "350px", height: "300px" }}>
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
