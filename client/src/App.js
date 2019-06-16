import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ShellList from "./components/shellList";
import Shell from "./components/shellDetail";
import User from "./components/user";
import Item from "./components/item";
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
                            <div><Link to="/items/">Items</Link></div>
                            <div><Link to="/users/">User Login</Link></div>
                            <div><Link to="/admin/">admin</Link></div>
                        </nav>
                    </div>
 
                     <Switch>
                       <Route exact path="/shells/" component={ShellList}/>
                       <Route exact path="/shells/:id/" component={Shell}/>
                       <Route exact path="/items/:id/" component={Item}/>
                       <Route exact path="/users/:id/" component={User}/>
                       <Route exact path="/admin/" component={Admin}/>
                     </Switch>
                </div>
            </Router>
        );
    }
}

export default App;