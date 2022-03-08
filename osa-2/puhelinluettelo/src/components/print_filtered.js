// yksittäisen henkilön tulostava komponentti
const Person = (props) => (
  <div>
    {props.person}: {props.number}{" "}
    <button onClick={() => props.deletePerson(props.id, props.person)}>
      delete
    </button>
  </div>
);

// puhelinluettelon tulostus
const FilteredPersonsList = (props) =>
  props.persons
    .filter((person) =>
      person.name.toLowerCase().includes(props.filtered.toLowerCase())
    )
    .map((filteredPerson) => (
      <Person
        key={filteredPerson.id}
        person={filteredPerson.name}
        number={filteredPerson.number}
        deletePerson={props.deletePerson}
        id={filteredPerson.id}
      />
    ));

export default FilteredPersonsList;
