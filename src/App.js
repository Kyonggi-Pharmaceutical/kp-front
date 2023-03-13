import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    clients: []
  };

  async componentDidMount() {
    const response = await fetch('/test/ping');
    const body = await response.text();
    this.setState({ping: body});
  }

  render() {
    const {ping} = this.state;
    console.log(ping);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>ping</h2>
              {
                <div>
                {ping}
                </div>
              }
            </div>
          </header>
        </div>
    );
  }
}
export default App;
