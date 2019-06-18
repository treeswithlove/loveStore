import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Shell from "./components/shellDetail";
import User from "./components/user";
import Order from "./components/orderDetail";
import Home from "./components/home";
import IndexAll from "./components/IndexAll";
import "./App.css";
import axios from 'axios'


class App extends Component {
    state = {
        weather: [],
        temp: [],
        icon: []
    }
    componentDidMount = () => {
        this.weatherAPI();
    }

    weatherAPI = () => {
        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=33&lon=-84`)
            .then(res => {
                console.log(res.data['weather'])
                let weather = document.getElementById('sky').innerHTML = res.data['weather'][0]['main']
                let icon = document.getElementById('icon').innerHTML = res.data['weather'][0]['icon']
                let temp = document.getElementById('hot').innerHTML = res.data['main']['temp']
                this.setState({ type: weather, temp: temp, icon: icon })
            })
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="temp">
                        <h4 id="sky"> </h4>
                        <img id="icon" src="" alt="weather icon" />
                        <h4 id="hot"> degrees</h4>
                        
                    </div>
                    <h3 className="temp">It's a great day for online shopping!</h3>
                      
                    <div>
                        <h1>Love Shop</h1>
                        <nav>
                            <div><Link to="/">Home</Link></div>
                            <div><Link to="/content/">Products</Link></div>
                        </nav>
                    </div>

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/content/" component={IndexAll} />
                        <Route exact path="/users/:id/" component={User} />
                        <Route exact path="/shells/:id/" component={Shell} />
                        <Route path="/orders/:id/" component={Order} />

                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;