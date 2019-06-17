// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Item from './item'
import axios from 'axios'

class ItemList extends Component {
    state = {
        items: [],
        createItemForm: false,
        newItem: {

        }
    }

    componentDidMount = () => {
        axios.get('/api/v1/items/')
            .then(res => {
                this.setState({ items: res.data })
            })
    }
    handleChange = (e) => {
        let newItem = { ...this.state.newItem }
        newItem[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newItem })
    }
    toggleCreateForm = () => {
        this.setState((state) => {
            return { createItemForm: !state.createItemForm }
        })
    }
    createItem = (e) => {
        e.preventDefault()
        axios.post('/api/v1/items/', this.state.newItem)
            .then(res => {
                console.log(res.data)
                const itemsList = [...this.state.items]
                itemsList.unshift(res.data)
                this.setState({
                    newItem: {},
                    createItemForm: false,
                    items: itemsList
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
        const items = this.state.items
        const itemComponent = items.map((item, index) => {
            return (<Item
                key={index}
                index={index}
                item={item}
                id={item.id}
            />

            )
        })
        return (
            <div>
                <h1 className="title">Item List</h1>
                <button onClick={this.toggleCreateForm}><h4>New Item</h4></button>
                {
                    this.state.createItemForm

                        ? <form onSubmit={this.createItem}>

                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newItem.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.newItem.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.newItem.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.newItem.price}
                                />
                            </div>

                            <div>
                                <input type='submit' value='submit' />
                            </div>
                        </form>

                        : null
                }
                <ul className="ulItems">
                    {itemComponent}


                </ul>

            </div>
        )
    }

}
export default ItemList;