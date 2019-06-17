import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class ShellCreate extends Component {
    state = {
        error: '',
        newShell: {}
    }

    handleChange = (e) => {
        let newShell = { ...this.state.newShell }
        newShell[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newShell: newShell })
    }

    createShell = (e) => {
        e.preventDefault()
        axios.post('/api/v1/shells/', this.state.newShell)
            .then(res => {
                console.log(res.data)
                this.props.updateShellList(res.data)
                this.props.toggleCreateForm()
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err.message })
            })
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }

       
        return (
            <div>

                    <form onSubmit={this.createShell}>

                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.newShell.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="image_url">Image URL</label>
                            <input
                                id="image_url"
                                name="image_url"
                                onChange={this.handleChange}
                                value={this.state.newShell.image_url}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.newShell.description}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.newShell.price}
                            />
                        </div>
                        <div>
                            <label htmlFor="sku">SKU</label>
                            <input
                                id="sku"
                                name="sku"
                                onChange={this.handleChange}
                                value={this.state.newShell.sku}
                            />
                        </div>

                        <div>
                            <input type='submit' value='submit' />
                        </div>
                    </form>

         </div>
        )
    }

}
export default ShellCreate;