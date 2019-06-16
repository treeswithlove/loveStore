// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Shell from './shell'
import axios from 'axios'

class ShellList extends Component {
    state = {
        shells: [],
        createShellForm: false,
        newShell: {

        }
    }

    componentDidMount = () => {
        axios.get('/api/v1/shells/')
            .then(res => {
                this.setState({ shells: res.data })
            })
    }
    handleChange = (e) => {
        let newShell = { ...this.state.newShell }
        newShell[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newShell })
    }
    toggleCreateForm = () => {
        this.setState((state) => {
            return { createShellForm: !state.createShellForm }
        })
    }
    createShell = (e) => {
        e.preventDefault()
        axios.post('/api/v1/shells/', this.state.newShell)
            .then(res => {
                console.log(res.data)
                const shellsList = [...this.state.shells]
                shellsList.unshift(res.data)
                this.setState({
                    newShell: {},
                    createShellForm: false,
                    shells: shellsList
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
        const shells = this.state.shells
        const shellComponent = shells.map((shell, index) => {
            return (<Shell
                key={index}
                index={index}
                shell={shell}
                id={shell.id}
            />

            )
        })
        return (
            <div>
                <h1 className="title">Shell List</h1>
                <button onClick={this.toggleCreateForm}><h4>New Shell</h4></button>
                {
                    this.state.createShellForm

                        ? <form onSubmit={this.createShell}>

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
                                <input type='submit' value='submit' />
                            </div>
                        </form>

                        : null
                }
                <ul className="ulShells">
                    {shellComponent}


                </ul>

            </div>
        )
    }

}
export default ShellList;