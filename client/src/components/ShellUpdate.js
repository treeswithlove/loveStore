import React, { Component } from 'react'
import axios from 'axios'

class ShellUpdate extends Component {
    state = {
        error: '',
        currentShell: {}
    }
    
    componentDidMount = () => {
        this.setState((state) => {
            return {
                currentShell: this.props.shell
            }
        })
    }

    handleChange = (e) => {
        let currentShell = { ...this.state.currentShell }
        currentShell[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ currentShell: currentShell })
    }

    //updates shell
    updateShell = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/shells/${this.state.currentShell.id}/`, this.state.currentShell)
            .then(() => {
                // this.setState({ isEditFormDisplayed: false })
                this.props.toggleEditForm()
                this.props.refreshShellList()

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


        return (
            <div>

                <form onSubmit={this.updateShell}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.currentShell.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="image_url">Image URL</label>
                        <input
                            id="image_url"
                            name="image_url"
                            onChange={this.handleChange}
                            value={this.state.currentShell.image_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.currentShell.description}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            onChange={this.handleChange}
                            value={this.state.currentShell.price}
                        />
                    </div>
                    <div>
                        <label htmlFor="sku">SKU</label>
                        <input
                            id="sku"
                            name="sku"
                            onChange={this.handleChange}
                            value={this.state.currentShell.sku}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            name="quantity"
                            onChange={this.handleChange}
                            value={this.state.currentShell.quantity}
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
export default ShellUpdate;