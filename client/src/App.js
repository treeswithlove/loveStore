import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Shell from "./components/shellDetail";
import ShellIndex from "./components/ShellIndex"
import User from "./components/user";
import UserIndex from "./components/UserIndex";
import Order from "./components/orderDetail";
import OrderIndex from "./components/OrderIndex";
import Home from "./components/home";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Love Shop</h1>
                        <nav>
                            <div><Link to="/shells/">Shells</Link></div>
                            <div><Link to="/orders/">Order</Link></div>
                            <div><Link to="/users/">Users</Link></div>
                            <div><Link to="/">Home</Link></div>
                        </nav>
                    </div>
 
                     <Switch>
                       <Route exact path="/" component={Home}/>
                       <Route exact path="/users/" component={UserIndex}/>
                       <Route exact path="/users/:id/" component={User}/>
                       <Route exact path="/shells/" component={ShellIndex}/>
                       <Route exact path="/shells/:id/" component={Shell}/>
                       <Route exact path="/orders/" component={OrderIndex}/> 
                       <Route exact path="/orders/:id/" component={Order}/>
                    
                     </Switch>
                  
                </div>
            </Router>
        );
    }
}

export default App;