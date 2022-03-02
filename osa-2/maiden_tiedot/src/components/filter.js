// suodatuskentän toteutus
const FilterNameInput = (props) => (
    <div>
      Find countries <input value={props.filter} onInput={props.handler} />
    </div>
  );

  export default FilterNameInput;