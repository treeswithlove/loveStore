// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Order from './order'
import axios from 'axios'

class OrderList extends Component {
    state = {
        orders: [],
        createOrderForm: false,
        newOrder: {

        }
    }

    componentDidMount = () => {
        axios.get('/api/v1/orders/')
            .then(res => {
                this.setState({ orders: res.data })
            })
    }
    handleChange = (e) => {
        let newOrder = { ...this.state.newOrder }
        newOrder[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newOrder })
    }
    toggleCreateForm = () => {
        this.setState((state) => {
            return { createOrderForm: !state.createOrderForm }
        })
    }
    createOrder = (e) => {
        e.preventDefault()
        axios.post('/api/v1/orders/', this.state.newOrder)
            .then(res => {
                console.log(res.data)
                const ordersList = [...this.state.orders]
                ordersList.unshift(res.data)
                this.setState({
                    newOrder: {},
                    createOrderForm: false,
                    orders: ordersList
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err.message })
            })
    }


    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        const orders = this.state.orders
        const orderComponent = orders.map((order, index) => {
            return (<Order
                key={index}
                index={index}
                order={order}
                id={order.id}
            />

            )
        })
        return (
            <div>
                <h1 className="title">Order List</h1>
                <button onClick={this.toggleCreateForm}><h4>New Order</h4></button>
                {
                    this.state.createOrderForm

                        ? <form onSubmit={this.createOrder}>

                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newOrder.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.newOrder.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.newOrder.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.newOrder.price}
                                />
                            </div>

                            <div>
                                <input type='submit' value='submit' />
                            </div>
                        </form>

                        : null
                }
                <ul className="ulOrders">
                    {orderComponent}


                </ul>

            </div>
        )
    }

}
export default OrderList;