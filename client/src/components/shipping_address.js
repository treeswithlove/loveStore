import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//styled components or bootstrap or materialize
class Shipping_address extends Component {
    state = {
        shipping_address: {id: ''},
        redirectToHome: false,
        redirectShipping_addressList: false,
        isEditFormDisplayed: false
    }
    //gets the shipping_address
    componentDidMount = () => {
        axios.get(`/api/v1/shipping_addresss/${this.props.id}/`)
            .then(res => {
                // console.log(res)
                this.setState({ shipping_address: res.data })
            })
    }
    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }
    //updates shipping_address
    updateShipping_address = (e) => {
        e.preventDefault()
        console.log(this.state.shipping_address)
        axios.put(`/api/v1/shipping_addresss/${this.state.shipping_address.id}/`, this.state.shipping_address)
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }
    //creates clone as placeholder
    handleChange = (e) => {
        const newShipping_address = { ...this.state.shipping_address }
        newShipping_address[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ shipping_address: newShipping_address })
    }

    //deletes shipping_address
    deleteShipping_address = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/shipping_addresss/${this.state.shipping_address.id}/`)
            .then(() => {
                this.setState({ redirectShipping_addressList: true })
            })
    }

    render() {
        if (this.state.redirectShipping_addressList){
            return (<Redirect to="/shipping_addresss/" />)
        }

       
        const url = `/shipping_addresss/${this.state.shipping_address.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachShipping_address">
                <li><Link to={url}><h3>{this.state.shipping_address.name} </h3> </Link></li>
                <li><img src={this.state.shipping_address.image_url} alt={this.props.name} /> </li>
                <li><h4>{this.state.shipping_address.description} </h4> </li>
                <li><h4>${this.state.shipping_address.price}</h4> </li>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateShipping_address}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.shipping_address.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.shipping_address.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.shipping_address.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.shipping_address.price}
                                />
                            </div>
                            <input type="submit" value="submit" />
                            <input onClick={this.deleteShipping_address} type='submit' value='delete' />

                        </form>
                        : null

                }  <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>




                </li>
            </div>

        )
    }

}
export default Shipping_address;