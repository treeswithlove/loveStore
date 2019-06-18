import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import ShellUpdate from "./ShellUpdate"

//styled components or bootstrap or materialize
class Shell extends Component {
    state = {
        currentShell: {},
        redirectToHome: false,
        redirectShellList: false,
        isEditFormDisplayed: false
    }
    //gets the shell
    componentDidMount = () => {

    }

    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    //deletes shell
    deleteShell = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/shells/${this.props.shell.id}/`)
            .then(() => {
                this.setState({ redirectShellList: true })
            })
    }

    render() {
        if (this.state.redirectShellList) {
            return (<Link to="/content/" />)
        }


        const url = `/shells/${this.props.shell.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachShell">
                <li><Link to={url}><h3>{this.props.shell.name} </h3> </Link></li>
                <li><img src={this.props.shell.image_url} alt={this.props.name} /> </li>
                <li><h4>{this.props.shell.description} </h4> </li>
                <li><h4>${this.props.shell.price}</h4> </li>

            
                {
                    this.state.isEditFormDisplayed
                        ?
                        <ShellUpdate
                            shell={this.props.shell}
                            toggleEditForm={this.toggleEditForm}
                            refreshShellList={this.props.refreshShellList}
                        />
                        : null

                }
                <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>
                <button onClick={this.deleteShell}><h4>Delete</h4></button>
                </li>
            </div>

        )
    }

}
export default Shell;