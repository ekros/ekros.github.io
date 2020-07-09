import React from "react"
import { Link } from "gatsby"
import './index.css';

export default () => (
  <div>
  <header>
    <h1 className="sticky-header">Eric Ros, Front-end developer</h1>
    <div>
      <a href="https://github.com/ekros/" target="_blank"><img src="assets/github.png" /></a>
      <a href="https://codepen.io/ekros" target="_blank"><img src="assets/codepen.png" /></a>
      <a href="https://twitter.com/ericrosbh" target="_blank"><img src="assets/twitter.png" /></a>
    </div>
    <p className="presentation">
      {"I'm a Front-end developer from Barcelona. I love creating reusable and composable interfaces with ReactJS."}
      {" As a life-long learner, I'm always looking for new challenges. I dedicated the last ten years to the sports space."}
      {" It was an amazing time! Do you have a new challenge for me? Send me an email "}
      to <b>ericrosbh@gmail.com</b>.
    </p>
  </header>
  <h4>CV</h4>
  <p>Visit my <Link to="/cv" target="_blank">CV (web version)</Link></p>
  <p>You can download a more classic version <a href="assets/curriculum_2020.pdf" target="_blank">here</a></p>
  <h4>Projects</h4>
  <h5><a href="https://zoomtasticgame.com" target="_blank">zoomtasticgame.com</a></h5>
  <p>{"It started as a weekend project. It's a web-based game where the player has to guess the country while the map zooms out."}</p>
  <h5><a href="https://coincommander.cc" target="_blank">coincommander.cc</a></h5>
  <p>A simple cryptocurrencies app. It uses a microservice to grab data from Twitter based on your favorite coins. Not maintained for a while.</p>
  <h5><a href="https://github.com/ekros/nice-react-layout" target="_blank">nice-react-layout</a></h5>
  <p>One of my open-source projects. It gives some interesting features out-of-the-box like drag and drop or resizable panels.</p>
  <h5><a href="https://github.com/ekros/react-play-editor" target="_blank">react-play-editor</a></h5>
  <p>Create React components without leaving the browser and play with props and state with its auto-generated forms.</p>
  </div>
)
