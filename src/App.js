import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";


const places = [
  { name: "Lviv", zip: "79040" },
  { name: "Ternopil", zip: "46001" },
  { name: "Kyiv", zip: "01001" },
  { name: "Rivne", zip: "33004" },
  { name: "Sumy", zip: "40013" },
  { name: "Mykolaiv", zip: "54001" },
  { name: "Dnipro", zip: "49094" },
  { name: "Kharkiv", zip: "61108" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      ",ua&appid=c97472d1b3f43bc50b7a38cb09bef4cc&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Detailed: {weather.description}</p>
        <p>Current: {weatherData.main.temp}°C</p>
        <p>Feels like: {weatherData.main.feels_like}°C</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand>What weather is now?</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
        <Row>
            <Col md={4} sm={4}>
              <h3>Select a city from list</h3>
              <Nav variant="pills" className="flex-column" defaultActiveKey={activePlace} onSelect={index => 
                { this.setState({ activePlace: index }); 
                }}>
                {places.map((place, index) => (
                <Nav.Item key={index}>
                  <Nav.Link key={index} eventKey={index}>{place.name}</Nav.Link>
                </Nav.Item>))}
              </Nav>
            </Col>
            <Col>
              <WeatherDisplay key={activePlace} zip={places[activePlace].zip} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;