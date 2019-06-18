// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Shell from './shell'
import ShellIndex from './ShellIndex'
import OrderIndex from './OrderIndex'
import UserIndex from './UserIndex'
import axios from 'axios'

class ProductList extends Component {
    state = {
       error:""
    }
    componentDidMount = () => {

    }

    orderItem = () => {
        axios.get(`/api/v1/shells/${this.state.item.shell}`)
            .then(shell => {
                console.log(shell)
                const userName = 'test name'
                axios.get(`/api/v1/stripe?quantity=${this.state.item.quantity}&shell=${shell.name}&name=${userName}`)
            })
        // axios.get(`/api/v1/stripe?quantity=${this.state.item.quantity}`)
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }


        return (
            <div>
                    {JSON.stringify(this.state)}
                <button onClick={this.orderItem}>Order Item</button>
                <h1>Product List</h1>
                <ShellIndex/>
                <UserIndex/>
                <OrderIndex/>
            </div>
        )
    }

}
export default ProductList; 