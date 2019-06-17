import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ShellList from "./components/shellList";
import Shell from "./components/shellDetail";
import User from "./components/user";
import UserList from "./components/userList";
import Order from "./components/order";
import OrderList from "./components/orderList";
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
                       <Route exact path="/users/" component={UserList}/>
                       <Route exact path="/users/:id/" component={User}/>
                       <Route exact path="/shells/" component={ShellList}/>
                       <Route exact path="/shells/:id/" component={Shell}/>
                       <Route exact path="/orders/" component={OrderList}/>
                       <Route exact path="/orders/:id/" component={Order}/>
                    
                     </Switch>
                     <footer>
                         <h4>here lies a footer</h4>
                     </footer>
                </div>
            </Router>
        );
    }
}

export default App;