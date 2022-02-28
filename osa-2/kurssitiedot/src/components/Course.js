// yksittäisen kurssin rakentava komponentti
// -> kurssit mapataan komponenttia kutsuvassa juurikomponentissa App()
const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} exercises={props.course.exercises} />
        <Total parts={props.course.parts} />
      </div>
    );
  };
  
  // otsikkokomponentti
  const Header = (props) => {
    return <h1>{props.name}</h1>;
  };
  
  // kurssisisältöjen komponentti
  const Content = (props) => {
    return (
      <div>
        <ul>
          {props.parts.map((part) => (
            <Part key={part.id} part={part.name} exercise={part.exercises} />
          ))}
        </ul>
      </div>
    );
  };
  
  // yksittäisten kurssitietojen komponentti
  const Part = (props) => {
    return (
      <li>
        {props.part}: <b>{props.exercise}</b>
      </li>
    );
  };
  
  // tehtävät summaava komponentti
  const Total = (props) => {
    const courseNum = props.parts.map((part) => part.exercises);
    return (
      <div>
        Total courses: {courseNum.reduce((sum, value) => sum + value, 0)}
      </div>
    );
  };

  export default Course;