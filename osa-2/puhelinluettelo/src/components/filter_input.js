// filtteröintisyötteen vastaanotto
const FilterPersonsInput = (props) => (
    <div>
      filter <input value={props.filtered} onInput={props.handleFilterChange} />
    </div>
  );

  export default FilterPersonsInput