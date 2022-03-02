import { useState, useEffect } from "react";
import axios from "axios";
import FilterNameInput from "./components/filter";
import ShowCountries from "./components/countries";

// the mother of all components
// ----------------------------------------------------------------------
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  // handlerit
  // --------------------------------------------------------------------
  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  // --------------------------------------------------------------------
  return (
    <div>
      <h1>Country Browser</h1>
      <FilterNameInput filter={filterName} handler={handleFilterName} />

      <ShowCountries countries={countries} filter={filterName} />
    </div>
  );
};

export default App;
