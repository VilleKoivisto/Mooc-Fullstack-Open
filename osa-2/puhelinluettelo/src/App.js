import { useState, useEffect } from "react";

import FilterPersonsInput from './components/filter_input'
import FilteredPersonsList from "./components/print_filtered";
import AddPersonForm from "./components/addperson";
import dataService from "./services/dataserver";

// kaikkien komponenttien äiti
// -----------------------------------------------------------------------------------
const App = () => {
  // tapahtumankäsittelijät / state-hookit
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  // haetaan data effect-hookin avulla
  useEffect(() => {
    dataService
    .getAll()
    .then((response) => {
      setPersons(response);
    });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    // testaa löytyykö nimi jo luettelosta
    if (persons.some((entry) => entry.name === newName)) {
      let replace = window.confirm(`Name ${newName} is already in the phonebook. Replace the old number?`);
      
      if (replace) {
        let id = persons.find((person) => person.name === newName).id

        dataService
        .update(personObject, id)
        .then(() => {
          dataService
          .getAll()
          .then((response) => {
            setPersons(response);
          });
        })
      } else {
        return console.log('Replace cancelled')
      }
    } else {
      dataService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      })
    }
  };

  // poista henkilön tiedot luettelosta
  const deletePerson = (id, person) => {

    let askConfirmation = window.confirm(`Delete ${person}?`)

    if (askConfirmation) {
      dataService
      .deleteOne(id)
      .then((response) => {
        console.log(`${response.status}: id ${id} deleted from the phonebook`)
        dataService
        .getAll()
        .then((response) => {
          setPersons(response);
        });
      })
    }
  }

  // handlerit
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFiltered(event.target.value);
  };

  // -----------------------------------------------------------------------------------
  return (
    <div>
      <h1>Phonebook</h1>

      <FilterPersonsInput
        filtered={filtered}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add new</h2>

      <AddPersonForm
        addPerson={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <FilteredPersonsList persons={persons} filtered={filtered} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
