// yksittäisen maan nimen muotoilu
// ---------------------------------------------------------------------------
const CountryName = (props) => <div>{props.name}</div>;

// yksittäisen kielen muotoilu
// ---------------------------------------------------------------------------
const LanguageListItems = (props) => (
  <div>
    <li>{props.language}</li>
  </div>
);

// yksittäisen maan tietojen näyttäminen
// ---------------------------------------------------------------------------
const CountryDetails = (props) => (
  <div>
    <h1>{props.name}</h1>
    <div>
      <b>Capital:</b> {props.capital}
      <br />
      <b>Area:</b> {props.area}
    </div>
    <h2>Languages</h2>
    <ul>
      {Object.entries(props.languages).map(([key, value]) => (
        <LanguageListItems key={key} language={value} />
      ))}
    </ul>
    <h2>Flag</h2>
    <div>
      <img src={props.flag} width="100" alt="country flag" />
    </div>
  </div>
);

// eri näyttötilojen logiikka & maasuodatus
// ---------------------------------------------------------------------------
const ShowCountries = (props) => {
  const filtered = props.countries.filter((country) =>
    country.name.official.toLowerCase().includes(props.filter.toLowerCase())
  );

  if (filtered.length > 10) {
    return (
      <div>
        Too many matches
        <br/>
        Please specify filter...
      </div>
    );
  } else if (filtered.length === 1) {
    return (
      <CountryDetails
        name={filtered[0].name.official}
        capital={filtered[0].capital}
        area={filtered[0].area}
        flag={filtered[0].flags.png}
        languages={filtered[0].languages}
      />
    );
  } else {
    return filtered.map((filteredCountry) => (
      <CountryName
        key={filteredCountry.name.official}
        name={filteredCountry.name.official}
      />
    ));
  }
};

export default ShowCountries;
