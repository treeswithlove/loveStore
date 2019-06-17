import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//styled components or bootstrap or materialize
class Order extends Component {
    state = {
        order: {id: ''},
        redirectToHome: false,
        redirectOrderList: false,
        isEditFormDisplayed: false,
    }
    //gets the order
    componentDidMount = () => {
        axios.get(`/api/v1/orders/${this.props.id}/`)
            .then(res => {
                console.log(res.data)
                this.setState({ order: res.data })
            })
      
    }
    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }
    //updates order
    updateOrder = (e) => {
        e.preventDefault()
        console.log(this.state.order)
        axios.put(`/api/v1/orders/${this.state.order.id}/`, this.state.order)
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }
    //creates clone as placeholder
    handleChange = (e) => {
        const newOrder = { ...this.state.order }
        newOrder[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ order: newOrder })
    }

    //deletes order
    deleteOrder = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/orders/${this.state.order.id}/`)
            .then(() => {
                this.setState({ redirectOrderList: true })
            })
    }

    render() {
        if (this.state.redirectOrderList){
            return (<Redirect to="/orders/" />)
        }

       
        const url = `/orders/${this.state.order.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachOrder">
                <li><Link to={url}><h3>{this.state.order.name} </h3> </Link></li>
  
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateOrder}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.order.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.order.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.order.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.order.price}
                                />
                            </div>
                            <input type="submit" value="submit" />
                            <input onClick={this.deleteOrder} type='submit' value='delete' />

                        </form>
                        : null

                }  <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>




                </li>
            </div>

        )
    }

}
export default Order;