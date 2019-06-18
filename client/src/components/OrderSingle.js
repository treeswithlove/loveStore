import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import OrderUpdate from "./OrderUpdate"

//styled components or bootstrap or materialize
class Order extends Component {
    state = {
        currentOrder: {},
        redirectToHome: false,
        redirectOrderList: false,
        isEditFormDisplayed: false
    }
    //gets the order
    componentDidMount = () => {

    }

    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    //deletes order
    deleteOrder = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/orders/${this.props.order.id}/`)
            .then(() => {
                this.setState({ redirectOrderList: true })
            })
    }

    render() {
        if (this.state.redirectOrderList) {
            return (<Link to="/content/" />)
        }


        const url = `/orders/${this.props.order.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachOrder">
                <li><Link to={url}><h3>{this.props.order.name} </h3> </Link></li>
                
                {
                    this.state.isEditFormDisplayed
                        ?
                        <OrderUpdate
                            order={this.props.order}
                            toggleEditForm={this.toggleEditForm}
                            refreshOrderList={this.props.refreshOrderList}
                        />
                        : null

                }
                <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>
                <button onClick={this.deleteOrder}><h4>Delete</h4></button>
                </li>
            </div>

        )
    }

}
export default Order;