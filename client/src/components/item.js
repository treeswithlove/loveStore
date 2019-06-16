import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//styled components or bootstrap or materialize
class Item extends Component {
    state = {
        item: {},
        redirectToHome: false,
        redirectItemList: false,
        isEditFormDisplayed: false
    }
    //gets the Item
    componentDidMount = () => {
        axios.get(`/api/v1/items/${this.props.match.params.id}/`)
            .then(res => {
                this.setState({ item: res.data })
            })
    }
    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }
    //updates Item
    updateItem = (e) => {
        e.preventDefault()
        console.log(this.state.item)
        axios.put(`/api/v1/items/${this.state.item.id}/`, this.state.item)
            .then((res) => {
                this.setState({ item: res.data, isEditFormDisplayed: false })
            })
    }
    //creates clone as placeholder
    handleChange = (e) => {
        const newItem = { ...this.state.item }
        newItem[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ item: newItem })
    }

    //deletes Item
    deleteItem = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/items/${this.state.item.id}/`)
            .then(() => {
                this.setState({ redirectItemList: true })
            })
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
    //this.state.options
    render() {
        if (this.state.redirectItemList) {
            return (<Redirect to="/items/" />)
        }
        const url = `/items/${this.props.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachItem">
                {JSON.stringify(this.state)}
                <button onClick={this.orderItem}>Order Item</button>
                <li><Link to={url}><h3>{this.state.item.quantity} </h3> </Link></li>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateItem}>
                            <div>
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    id="quantity"
                                    type="text"
                                    name="quantity"
                                    onChange={this.handleChange}
                                    value={this.state.item.quantity}
                                />
                            </div>
                            <div>
                                <label htmlFor="shellModel">Shell</label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    onChange={this.handleChange}
                                    value={this.state.item.last_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Order</label>
                                <input
                                    id="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.item.email}
                                />
                            </div>
                            <input type="submit" value="submit" />
                            <input onClick={this.deleteItem} type='submit' value='delete' />

                        </form>
                        : null

                }  <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>




                </li>
            </div>

        )
    }

}
export default Item;