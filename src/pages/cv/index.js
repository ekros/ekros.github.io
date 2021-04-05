import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      skills: false,
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
    const { skills, experience, education, languages, interests, contact } = this.state;
    if (!skills && scrollTop > 200 ) {
      this.setState({ skills: true });
    } else if (!experience && scrollTop > 540) {
      this.setState({ experience: true });
    } else if (!interests && scrollTop > 1760) {
      this.setState({ interests: true });
    }
  };

  render() {
    const { skills, experience, education, languages, interests, contact } = this.state;
    return (
      <div className="App">
        <NoteOnSide>Made with ReactJS and vanilla CSS | Powered by Gatsby</NoteOnSide>
        <header>
          <Title>Eric Ros, Senior Front-end developer</Title>
          <Subtitle><SubtitleLabel>Demos</SubtitleLabel> <SubtitleContent><a href="https://codepen.io/ekros/" target="_blank">Codepen</a></SubtitleContent></Subtitle>
          <Subtitle><SubtitleLabel>Open-source projects</SubtitleLabel><SubtitleContent><a href="https://github.com/ekros/nice-react-layout" target="_blank">Nice React Layout</a> | <a href="https://github.com/ekros/react-play-editor">React Play Editor</a></SubtitleContent></Subtitle>
          <Subtitle><SubtitleLabel>Email</SubtitleLabel><SubtitleContent><a href="mailto:ericrosbh@gmail.com">ericrosbh@gmail.com</a></SubtitleContent></Subtitle>
          <Presentation>
            Hi, I am a Front-end developer from Barcelona and this is my CV, coded with ReactJS and good old CSS.
            As a life-long learner, I am always looking for new challenges. I dedicated the last ten years to the sports space.
            It was an amazing time, but now I am looking towards new horizons! Do you have a challenge for me?
          </Presentation>
        </header>
        <Section>
          Skills
        </Section>
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Javascript" value={100} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="ReactJS" value={100} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="HTML / CSS / SASS" value={100} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Git" value={80} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Typescript" value={70} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="NodeJS / MeteorJS" value={60} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="ElectronJS" value={55} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="System administration" value={50} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Svelte" value={45} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="React Native" value={40} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Design" value={35} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Ruby On Rails" value={30} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="Java" value={25} />
          <SkillBar className={skills ? "Skillbar--animate" : ""} label="C/C++" value={20} />
        <Section>Experience</Section>
          <br /><br />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={0} company="Acer" label="Technician-Team leader" year="2006" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={1} company="Abiquo" label="Java & C++ developer" year="2008" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={2} company="ACB" label="Web dev and IT officer" year="2009" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={3} company="Dorna Sports" label="Front-end developer" year="2016" />
          <ExperienceNode className={experience ? "ExperienceNode__line--animate" : ""} lineDelay={4} company="[Your company here]" label="" year="today" isLast />
        <Section>Education</Section>
          <div className="education"><small>2007</small>Telecomunications and electronics engineering (Universitat Politécnica de Catalunya)</div>
          <div style={{ height: "40px" }} />
          <div  className="education"><small>2020</small>The Power MBA</div>
        <Section>Languages</Section>
          <h4>Native</h4>
          <p className="lang">Spanish <img src="../assets/es.png" /></p>
          <p className="lang">Catalan <img src="../assets/cat.png" /></p>
          <h4>High</h4>
          <p className="lang">English <img src="../assets/en.png" /></p>
        <Section>Interests</Section>
        <InterestPie className={interests ? "InterestPie__pie--animate" : ""} interests={[
            {
              label: "Creative Writing",
              weight: 0.3,
              color: "gold"
            },
            {
              label: "Virtual Reality",
              weight: 0.2,
              color: "orange"
            },
            {
              label: "Game Development",
              weight: 0.2,
              color: "palegreen"
            },
            {
              label: "Design",
              weight: 0.1,
              color: "deepskyblue"
            },
            {
              label: "Traveling",
              weight: 0.1,
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

const SkillBar = ({ className, label, value }) => (
  <div style={{
      width: `${value}%`,
      filter: `hue-rotate(${value/20}deg) opacity(${value + 50}%)`
    }}
    className={`Skillbar ${className}`}>{label}</div>
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
      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(lastAngle + angle);
      ctx.font = "14px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(interest.label, 25, -4);
      ctx.restore();
      lastAngle += angle;
    });
  }
  render() {
    const { className, interests } = this.props;
    return (
      <div style={{ display: "flex", justifyContent: "center", height: "300px" }}>
        <canvas ref={this.pie} width="300" height="300" className={`InterestPie__pie ${className}`}></canvas>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "350px", height: "300px" }} className="Interest__pie__labels">
          {
            interests && interests.map(interest => (
              <div key={interest.label} style={{ color: interest.color, fontSize: "30px", fontWeight: "bold" }}>{interest.label}</div>
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

const Presentation = class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ index: this.state.index + 1 });
      if (this.state.index === this.props.children.length) {
        clearInterval(this.interval);
      }
    }, 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Presentation">{this.props.children && this.props.children.substring &&
        this.props.children.substring(0, this.state.index)}</div>
    )
  }
}

export default App;
