// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Shell from './shell'
import axios from 'axios'

class ShellList extends Component {
    state = {
        shells: [],
        createShellForm: false,
        newShell: {}
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
        axios.post('/shells', this.state.newShell)
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
    }

    render() {
        const shells = this.state.shells
        const shellComponent = shells.map((shell, index) => {
            return (<Shell
                key={index}
                index={index}
                id={shell.id}
            />

            )
        })
        return (
            <div>
                <h1 className="title">Shell List</h1>
                {/* <button onClick={this.toggleCreateForm}><h4>New Perspective</h4></button>
                {
                    this.state.createShellForm

                        ? <form onSubmit={this.createShell}>

                            <div>
                                <label>Perspective</label>
                                <input
                                    className='shellCreateName'
                                    type='text'
                                    id='name'
                                    name='name'
                                    onChange={this.handleChange}
                                    value={this.state.newShell.name} />
                            </div>
                            <div>
                                <label htmlFor="oldPerspective">Old Perspective</label>
                                <textarea
                                    id="oldPerspective"
                                    name="oldPerspective"
                                    onChange={this.handleChange}
                                    value={this.state.newShell.oldPerspective}
                                />
                            </div>

                            <div>
                                <input type='submit' value='submit' />
                            </div>
                        </form>

                        : null
                } */}
                <ul className="ulShells">
                    {shellComponent}


                </ul>

            </div>
        )
    }

}
export default ShellList;