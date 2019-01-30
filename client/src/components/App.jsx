import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import $ from 'jquery';

import Form from './Form.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// React Router Demo ----------------------------------------------------------
import { Route, Switch } from "react-router-dom";

import Header from './Header.jsx';

import Home from './Home.jsx';
import Projects from './Projects.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Topic from './Topic.jsx';
import Always from './Always.jsx';
import NoMatch from './NoMatch.jsx';
// ----------------------------------------------------------------------------


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: null,
        lastName: null,
        email: null,
        guests: null
      },
      currentView: 'form'    
    }
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
  }

  handleSubmitButtonClick(formData) {
    // ----------------------
    // Fix: Bad variable name
    // ----------------------
    const data = JSON.parse(JSON.stringify(formData));

    // -------------------------------------
    // Change: Use native Fetch API instead.
    // Change: Factor out to helpers file.
    // -------------------------------------
    $.ajax({
      url: '/projects',
      method: 'POST',
      data: data,
      success: (data) => {
        const wasRecordInserted = !data.lastErrorObject.updatedExisting;
        const resStatus = wasRecordInserted ? 'insert-success' : 'update-success';
        const resData = {
          firstName: data.value.firstName, 
          lastName: data.value.lastName, 
          email: data.value.email, 
          guests: data.value.guests
        };

        this.setState({
          data: resData,
          currentView: resStatus
        });

        console.log('Status of DB Query: ', resStatus);
      },
      error: (err) => {
        // -------------------
        // Display error view?
        // -------------------
        console.log('error: ', err);
      }
    });
  }

  render() {
    const currentView = this.state.currentView;

    const view = currentView === 'form'           ? ( <Form handleSubmitButtonClick={this.handleSubmitButtonClick}/> )
               : currentView === 'insert-success' ? ( <InsertConfirmation rsvp={this.state.data}/> )
               : currentView === 'update-success' ? ( <UpdateConfirmation rsvp={this.state.data}/> )
               : null;

    return (
      <div>
        <Header />

        {/*
        React Router v4.x.x Notes:
        --------------------------

        A <Switch> will iterate over all of its children <Route> elements 
        and only render the first one that matches the current location. This
        helps when multiple route’s paths match the same pathname, when animating 
        transitions between routes, and in identifying when no routes match the 
        current location (so that you can render a “404” component).

        Any time that you want to force navigation (maybe when a form is submitted?)
        you can render a <Redirect to="/login" />. Also really good for responsive
        routes that react to screen size changes. When a <Redirect> renders, it will
        navigate using its `to` prop.

        Don't forget about Loadable Components! You can dynamically load different
        portions of the site when a user navigates to that part, that way the user
        doesn't have to download the entire site all at once. 
        (In Docs, called: Code Splitting)
        WILL THIS BE USEFUL FOR COMPONENTS WITH LOTS OF PICTURES?

        Also, don't forget about Scroll Restoration, if pages are loading not scrolled
        to the top of the page!

        Use the "Preventing Transitions" example to show a prompt when a user has 
        filled in some of the fields in Lyandra's form and then tries to navigate
        away without submitting the form! (Easy!)

        Use the "No Match (404)" example to handle all undefined routes. (Easy!)

        Use the "Animated Transitions" example to create navigation animations. (Medium!)

        Use the "Modal Gallery" example to create a modal image gallery with proper 
        routing for the Projects page sub routes! (Hard!)
       */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={Always} /> {/*Not necessary in this case - just an example.*/}
          <Route component={NoMatch} /> {/*404 Component Here!*/}
        </Switch>
      </div>
    );
  }
}

export default App;
