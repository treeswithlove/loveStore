// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Shipping_address from './shipping_address'
import axios from 'axios'

class Shipping_addressList extends Component {
    state = {
        shipping_addresss: [],
        createShipping_addressForm: false,
        newShipping_address: {

        }
    }

    componentDidMount = () => {
        axios.get('/api/v1/shipping_addresss/')
            .then(res => {
                this.setState({ shipping_addresss: res.data })
            })
    }
    handleChange = (e) => {
        let newShipping_address = { ...this.state.newShipping_address }
        newShipping_address[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newShipping_address })
    }
    toggleCreateForm = () => {
        this.setState((state) => {
            return { createShipping_addressForm: !state.createShipping_addressForm }
        })
    }
    createShipping_address = (e) => {
        e.preventDefault()
        axios.post('/api/v1/shipping_addresss/', this.state.newShipping_address)
            .then(res => {
                console.log(res.data)
                const shipping_addresssList = [...this.state.shipping_addresss]
                shipping_addresssList.unshift(res.data)
                this.setState({
                    newShipping_address: {},
                    createShipping_addressForm: false,
                    shipping_addresss: shipping_addresssList
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
        const shipping_addresss = this.state.shipping_addresss
        const shipping_addressComponent = shipping_addresss.map((shipping_address, index) => {
            return (<Shipping_address
                key={index}
                index={index}
                shipping_address={shipping_address}
                id={shipping_address.id}
            />

            )
        })
        return (
            <div>
                <h1 className="title">Shipping_address List</h1>
                <button onClick={this.toggleCreateForm}><h4>New Shipping_address</h4></button>
                {
                    this.state.createShipping_addressForm

                        ? <form onSubmit={this.createShipping_address}>

                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newShipping_address.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.newShipping_address.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.newShipping_address.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.newShipping_address.price}
                                />
                            </div>

                            <div>
                                <input type='submit' value='submit' />
                            </div>
                        </form>

                        : null
                }
                <ul className="ulShipping_addresss">
                    {shipping_addressComponent}


                </ul>

            </div>
        )
    }

}
export default Shipping_addressList;