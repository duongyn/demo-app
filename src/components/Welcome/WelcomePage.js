
const Welcome = ({ name, age, color }) => {
    name = "Duong";
    age = "24";
    color = "blue";
    const language = "en"
    console.log("Welcome page render ", name);
    return (
      <div style={ { backgroundColor: color } }>
        <h1>{ language === "en" ? "Hello" : "Xin chào" } { name }</h1>
        <h2>Age: { age }</h2>
      </div>
    )
  };

  export default Welcome;