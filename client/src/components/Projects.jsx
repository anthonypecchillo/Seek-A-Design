import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Topic from './Topic.jsx';

const Projects = ({ match }) => (
  <div>
    <h2>Projects</h2>

    <ul>
      <li>
        <Link to={`${match.url}/wedding_packages`}>Wedding Packages</Link>
      </li>
      <li>
        <Link to={`${match.url}/occassion_invitations`}>Occassion Invitations</Link>
      </li>
      <li>
        <Link to={`${match.url}/other_goodies`}>Other Goodies</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

export default Projects;
