// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import OrderSingle from './OrderSingle'
import OrderCreate from './OrderCreate'
import axios from 'axios'

class OrderIndex extends Component {
    state = {
        orders: [],
        error: "",
        showCreateForm: false

    }
    componentDidMount = () => {
       this.refreshOrderList()
    }

    toggleCreateForm = () => {
        this.setState((state) => {
            return { showCreateForm: !state.showCreateForm }
        })
    }

    //updates list after creating new order
    updateOrderList = (newOrder) => {
        const orders = [...this.state.orders]
        orders.unshift(newOrder)
        this.setState({orders: orders})
    }

    //updates list after creating new order
    refreshOrderList = () => {
        axios.get('/api/v1/orders/')
        .then(res => {
            this.setState({ orders: res.data })
        })
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        const orders = this.state.orders
        const orderComponents = orders.map((order, index) => {
            return (<OrderSingle
                key={index}
                index={index}
                order={order}
                refreshOrderList = {this.refreshOrderList}
            />
            )
        })


        return (
            <div className="orderIndex">
               
                <button onClick={this.toggleCreateForm}>Create New Order</button>
                {
                    this.state.showCreateForm
                        ? <OrderCreate 
                        toggleCreateForm={this.toggleCreateForm}
                        updateOrderList={this.updateOrderList}
                        refreshOrderList = {this.refreshOrderList}
                        />
                        : null
                }
                <div>
                    {orderComponents}
                </div>
            </div>

        )
    }

}
export default OrderIndex;