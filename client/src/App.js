import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Shell from "./components/shellDetail";
import User from "./components/user";
import Order from "./components/orderDetail";
import Home from "./components/home";
import Content from "./components/IndexAll";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Love Shop</h1>
                        <nav>
                            <div><Link to="/">Home</Link></div>
                            <div><Link to="/content/">Content</Link></div>
                        </nav>
                    </div>
 
                     <Switch>
                       <Route exact path="/" component={Home}/>
                       <Route exact path="/content/" component={Content}/>
                       <Route exact path="/users/:id/" component={User}/>
                       <Route exact path="/shells/:id/" component={Shell}/>
                       <Route path="/orders/:id/" component={Order}/>
                    
                     </Switch>
                  
                </div>
            </Router>
        );
    }
}

export default App;