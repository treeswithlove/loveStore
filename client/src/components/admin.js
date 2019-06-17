import React, { Component } from 'react'
// import ShellList from './shellList'
import axios from 'axios'


class StuffList extends Component {
    state = {   
        shells: [],
        createShellForm: false,
        redirectToHome: false,
        isEditFormDisplayed: false,
        newShell: {}
    }

    componentDidMount = () => {
        this.getShells();
    }
    getShells = () => {
        axios.get('/api/v1/shells/')
            .then(res => {
                console.log(res.data)
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
                    newShell: {
                        name: '',
                        image_url: '',
                        status_field: '',
                        description: '',
                        price: Number
                    },
                    createShellForm: false,
                    shells: shellsList
                })
            })
    }

    //deletes shell
    deleteShell = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/shells/${this.props.id}/`)
            .then(() => this.props.getShells())
    }

    render() {
        // const shells = this.state.shells
        // const shellComponent = shells.map((shell, index) => {
        //     return (<ShellList
        //         key={index}
        //         index={index}
        //         id={shell.id}
        //         name={shell.name}
        //         image_url={shell.image_url}
        //         status_field={shell.status_field}
        //         description={shell.description}
        //         price={shell.price}
        //         getShells={this.getShells}
        //     />

        //     )
        // })
        return (
            <div>

                {/* <h1 className="title">Shells for Sale</h1> */}
                <button onClick={this.toggleCreateForm}><h4>Create New Shells</h4></button>
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
                  <ShellList/>


                </ul>

            </div>
        )
    }

}
export default StuffList; 