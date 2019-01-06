import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';

// import Form from './Form.jsx';
// import InsertConfirmation from './InsertConfirmation.jsx';
// import UpdateConfirmation from './UpdateConfirmation.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      url: '/rsvps',
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
        <h2>CUSTOM DESIGNS MARKETING BRANDING AND MORE</h2>

        <div className="form">
          {view}
        </div>
      </div>
    );
  }
}

export default App;
