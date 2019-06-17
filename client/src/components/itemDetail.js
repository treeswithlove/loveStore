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
    //gets the item
    componentDidMount = () => {
        //     this.props.getItems()
        // }
        // getItems = () => {
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
    //updates item
    updateItem = (e) => {
        e.preventDefault()
        console.log(this.state.item)
        axios.put(`/api/v1/items/${this.state.item.id}/`, this.state.item)
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }
    //creates clone as placeholder
    handleChange = (e) => {
        const newItem = { ...this.state.item }
        newItem[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ item: newItem })
    }

    //deletes item
    deleteItem = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/items/${this.state.item.id}/`)
            .then(() => {
                this.setState({ redirectItemList: true })
            })
    }

    render() {
        if (this.state.redirectItemList){
            return (<Redirect to="/items/" />)
        }
        const url = `/items/${this.props.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachItem">
                <li><Link to={url}><h3>{this.state.item.name} </h3> </Link></li>
                <li><img src={this.state.item.image_url} alt={this.props.name} /> </li>
                <li><h4>{this.state.item.description} </h4> </li>
                <li><h4>${this.state.item.price}</h4> </li>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateItem}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.item.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.item.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.item.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.item.price}
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