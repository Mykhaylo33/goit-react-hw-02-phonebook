import { Component } from 'react';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addUser = newItem => {
    const decisionForAdd = this.isIncludingName(
      newItem.name,
      this.state.contacts
    );

    if (decisionForAdd) {
      alert(`${decisionForAdd.name} is already in contacts !`);
      return;
    }

    this.setState(prev => {
      return { contacts: [...prev.contacts, newItem] };
    });
  };

  filterByName = () => {
    const { filter, contacts } = this.state;
    const lowName = filter.toLowerCase();
    return contacts.filter(item => item.name.toLowerCase().includes(lowName));
  };

  isIncludingName = (name, array) => {
    const lowName = name.toLowerCase();
    return array.find(({ name }) => name.toLowerCase() === lowName);
  };

  inputHandler = e => {
    this.setState({ filter: e.target.value });
  };

  deleteHandler = id => {
    const queryIndex = this.state.contacts.findIndex(item => item.id === id);

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts].filter((item, index) => index !== queryIndex),
      };
    });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1 className={css.title}>Phonebook</h1>
        <Form addUser={this.addUser}></Form>
        <h2 className={css.title}>Contacts</h2>
        <Filter
          inputHandler={this.inputHandler}
          inputValue={this.state.filter}
        />
        <Contacts
          contactList={this.filterByName()}
          deleteContact={this.deleteHandler}
        />
      </div>
    );
  }
}

// идеи тел. книги:
// расположение списка - строгое в ячейках таблицы
// кнопки удалить/вызвать появится при выделении строки
// строки разных оттенков
// при фокусе есть обводка, стрелками вверх-вниз смена строки, кнопки del/enter удаляют и начинают звонок
// перед началом звонка - модалка "вы уверены что хотите звонить?"
// при удалении - модалка "вы уверены что хотите удалить?"
// проверка на существующий номер, для этого последние 9 цифр сравнить, для этого убрать пробелы и тире
// верстка адаптивная, на широком экране позади фон как в телеграмм
