import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ShellList from "./components/shellList";
import Shell from "./components/shell";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Love Shop</h1>
                        <nav>
                            <div><Link to="/shell">Shells Necklaces</Link></div>
                            <div><Link to="/user">User Login</Link></div>
                        </nav>
                    </div>
 
                     <Switch>
                       <Route exact path="/shell" component={ShellList}/>
                       <Route path="/shell/:id" component={Shell}/>
                     </Switch>
                </div>
            </Router>
        );
    }
}

export default App;