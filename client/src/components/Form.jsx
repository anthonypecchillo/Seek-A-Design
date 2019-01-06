import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email:  '',
      guests: '0'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {    
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      guests: this.state.guests
    }

    this.props.handleSubmitButtonClick(formData);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div id="name" autoFocus>
            <label htmlFor="first-name">First Name:</label>
            <input id="first-name" 
                   type="text" 
                   name="firstName" 
                   placeholder="Jane"
                   value={this.state.firstName}
                   onChange={this.handleInputChange}
                   required
            />

            <label htmlFor="last-name">Last Name:</label>
            <input id="last-name" 
                   type="text" 
                   name="lastName" 
                   placeholder="Doe"
                   value={this.state.lastName}
                   onChange={this.handleInputChange}
                   required
            />
          </div>

          <div id="email">
            <label htmlFor="email">Email:</label>
            <input id="email" 
                   type="email"
                   name="email"
                   placeholder="Jane.Doe@gmail.com"
                   value={this.state.email}
                   onChange={this.handleInputChange}
                   required
            />
          </div>

          <div id="guests">
            <label htmlFor="guests">Number of Guests:</label>
            <select id="guests" 
                    name="guests"
                    value={this.state.guests}
                    onChange={this.handleInputChange}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <div className="container">
          <div id="submit-button">
            <button type="submit" onClick={this.handleSubmit}>🍻🎈🎊🍾🎉Submit🎉🍾🎈🎊🍻</button>
          </div>
        </div>

      </form>
    );
  }
}

export default Form;
