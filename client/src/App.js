import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ShellList from "./components/shellList";
import Shell from "./components/shell";
import Admin from "./components/admin";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Love Shop</h1>
                        <nav>
                            <div><Link to="/shells/">Shells Necklaces</Link></div>
                            <div><Link to="/user/">User Login</Link></div>
                            <div><Link to="/admin/">admin</Link></div>
                        </nav>
                    </div>
 
                     <Switch>
                       <Route exact path="/shells/" component={ShellList}/>
                       <Route exact path="/shells/:sid/" component={Shell}/>
                       <Route exact path="/admin/" component={Admin}/>
                     </Switch>
                </div>
            </Router>
        );
    }
}

export default App;