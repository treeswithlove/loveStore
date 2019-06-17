// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import ShellSingle from './ShellSingle'
import ShellCreate from './ShellCreate'
import axios from 'axios'

class ShellIndex extends Component {
    state = {
        shells: [],
        error: "",
        showCreateForm: false

    }
    componentDidMount = () => {
        axios.get('/api/v1/shells/')
            .then(res => {
                this.setState({ shells: res.data })
            })
    }

    toggleCreateForm = () => {
        this.setState((state) => {
            return { showCreateForm: !state.showCreateForm }
        })
    }

    updateShellList = (newShell) => {
        const shells = [...this.state.shells]
        shells.unshift(newShell)
        this.setState({shells: shells})
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        const shells = this.state.shells
        const shellComponents = shells.map((shell, index) => {
            return (<ShellSingle
                key={index}
                index={index}
                shell={shell}
            />
            )
        })


        return (
            <div>
                <h1>Shell List</h1>
                <button onClick={this.toggleCreateForm}>Create New Shell</button>
                {
                    this.state.showCreateForm
                        ? <ShellCreate 
                        toggleCreateForm={this.toggleCreateForm}
                        updateShellList={this.updateShellList}
                        />
                        : null
                }
                <div>
                    {shellComponents}
                </div>
            </div>

        )
    }

}
export default ShellIndex;