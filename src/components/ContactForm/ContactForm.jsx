import React, { Component } from "react";
import PhonebookTitle from "../PhonebookTitle/PhonebookTitle";
import { nanoid } from "nanoid";
import AddContactButton from "components/AddContactButton/AddContactButton";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
      name: "",
      number: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { name, number } = this.state;

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.props.onAddContact(contact);
    this.setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, contact],
      name: "",
      number: "",
    }));
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />

          <PhonebookTitle
            title="Number"
            styles={{
              fontSize: 15,
              marginBottom: 0,
            }}
          />

          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
          />

          <AddContactButton styles={{ marginLeft: 30 }} />
        </form>
      </div>
    );
  }
}

export default ContactForm;
