import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//styled components or bootstrap or materialize
class Shell extends Component {
    state = {
        shell: {},
        redirectToHome: false,
        redirectShellList: false,
        isEditFormDisplayed: false,
        confirmation:{},
        result:{},
        amount: {}
    }
    //gets the shell
    componentDidMount = () => {
        axios.get(`/api/v1/shells/${this.props.match.params.id}/`)
            .then(res => {
                this.setState({ shell: res.data })
            })
    }

    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    //updates shell
    updateShell = (e) => {
        e.preventDefault()
        console.log(this.state.shell)
        axios.put(`/api/v1/shells/${this.state.shell.id}/`, this.state.shell)
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }

    //creates clone as placeholder
    handleChange = (e) => {
        const newShell = { ...this.state.shell }
        newShell[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ shell: newShell })
    }

    //deletes shell
    deleteShell = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/shells/${this.state.shell.id}/`)
            .then(() => {
                this.setState({ redirectShellList: true })
            })
    }

    orderShell = () => {
        console.log(this.state.shell.sku)
        axios.get(`/api/v1/stripe?shell=${this.state.shell.sku}&quantity=${this.state.shell.quantity}`)
            .then((res)=> {
                console.log(res.data)
                let confirmation = document.getElementById('response').innerHTML = res.data.data[0].id
                let amount = document.getElementById('amount').innerHTML = res.data.data[0].amount
                let result = document.getElementById('response').innerHTML = res.data.data[0].id
                this.setState({response: confirmation, result: result, amount: amount})
            })
    }

    render() {
        if (this.state.redirectShellList) {
            return (<Redirect to="/shells/" />)
        }
        const url = `/shells/${this.props.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachShell">
                <li><Link to={url}><h3>{this.state.shell.name} </h3> </Link></li>
                <li><img className="shellImage" src={this.state.shell.image_url} alt={this.props.name} /> </li>
                <li><h4>{this.state.shell.description} </h4> </li>
                <li><h4>${this.state.shell.price}</h4> </li>
                <li><h4>${this.state.shell.sku}</h4> </li>
                <li><h4>${this.state.shell.quantity}</h4> </li>

                <button onClick={this.orderShell}>Order Item</button>
                <p><p id="response"> </p>
                <p id="amount"> </p></p>

                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateShell}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.shell.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.shell.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.shell.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.shell.price}
                                />
                            </div>
                            <div>
                            <label htmlFor="sku">SKU</label>
                            <input
                                id="sku"
                                name="sku"
                                onChange={this.handleChange}
                                value={this.state.shell.sku}
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                onChange={this.handleChange}
                                value={this.state.shell.quantity}
                            />
                        </div>
                            <input type="submit" value="submit" />
                            <input onClick={this.deleteShell} type='submit' value='delete' />

                        </form>
                        : null

                }  <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>
                </li>
            </div>

        )
    }

}
export default Shell;