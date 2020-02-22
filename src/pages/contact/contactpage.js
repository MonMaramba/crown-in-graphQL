import React from "react";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./contactpage.scss";

class ContactPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      message: ""
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { email, name, phoneNumber, message } = this.state;
    console.log(email, name, phoneNumber, message);
    this.setState({
      //to clear form

      email: "",
      name: "",
      message: ""
    });
  };
  render() {
    return (
      <div className="contact">
        <h2>Get in touch with us</h2>
        <span>Our operators are waiting at{` `}</span>
        <br />
        <span className="note numbers">1(555) 555.555</span>
        <h2>Or</h2>
        <br />
        <span>Let us know what we can do for you</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="name"
            type="name"
            value={this.state.name}
            handleChange={this.handleChange}
            label="name"
            required
          />

          <FormInput
            name="message"
            type="string"
            value={this.state.message}
            handleChange={this.handleChange}
            label="message"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
          <br />

          <span className="note">
            As this is a fictional business, none of the data on this page will
            be submitted nor stored. If you wish to send me a message, please do
            so through monmaramba@yahoo.com . I would love to hear what you
            think of this project. Thanks
          </span>
        </form>
      </div>
    );
  }
}

export default ContactPage;
