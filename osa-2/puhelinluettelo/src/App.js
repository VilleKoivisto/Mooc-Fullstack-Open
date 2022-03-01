import { useState, useEffect } from "react";
import axios from "axios";

// yksittäisen henkilön tulostava komponentti
const Person = (props) => (
  <div>
    {props.person}: {props.number}
  </div>
);

// puhelinluettelon tulostaus
const FilteredPersonsList = (props) =>
  props.persons
    .filter((person) =>
      person.name.toLowerCase().includes(props.filtered.toLowerCase())
    )
    .map((filteredPerson) => (
      <Person
        key={filteredPerson.name}
        person={filteredPerson.name}
        number={filteredPerson.number}
      />
    ));

// filtteröintisyötteen vastaanotto
const FilterPersonsInput = (props) => (
  <div>
    filter <input value={props.filtered} onInput={props.handleFilterChange} />
  </div>
);

// henkilön lisäyksen toteutus
const AddPersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number:{" "}
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

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
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // lisää henkilö luetteloon
  const addPerson = (event) => {
    event.preventDefault();

    // testaa löytyykö nimi jo luettelosta
    if (persons.some((e) => e.name === newName)) {
      window.alert(`Name ${newName} is already in the phonebook`);
      setNewName("");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

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

  return (
    <div>
      <h1>Phonebook</h1>

      <FilterPersonsInput
        filtered={filtered}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add new</h2>

      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <FilteredPersonsList persons={persons} filtered={filtered} />
    </div>
  );
};

export default App;
