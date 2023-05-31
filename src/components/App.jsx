import React, { Component } from "react";
import PhonebookTitle from "./PhonebookTitle/PhonebookTitle";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import FilterContact from "./FilterContact/FilterContact";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
    };
  }

  addContact = (contact) => {
    const { contacts } = this.state;
    const isDuplicate = contacts.some(
      (existingContact) => existingContact.name === contact.name
    );
    if (isDuplicate) {
      alert("Contact already exists!");
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
          color: "#010101",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            padding: "15px 30px",
            width: 350,
          }}
        >
          <PhonebookTitle
            title="Name"
            styles={{
              fontSize: 15,
              marginBottom: 0,
            }}
          />
          <ContactForm onAddContact={this.addContact} />
        </div>

        <PhonebookTitle
          title="Contacts"
          styles={{
            fontSize: 25,
            marginBottom: 0,
          }}
        />

        <FilterContact
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
