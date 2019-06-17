import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import UserUpdate from "./UserUpdate"

//styled components or bootstrap or materialize
class User extends Component {
    state = {
        currentUser: {},
        redirectToHome: false,
        redirectUserList: false,
        isEditFormDisplayed: false
    }
    //gets the user
    componentDidMount = () => {
    
    }

    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    //deletes user
    deleteUser = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/users/${this.props.user.id}/`)
            .then(() => {
                this.setState({ redirectUserList: true })
            })
    }

    render() {
        if (this.state.redirectUserList) {
            return (<Redirect to="/users/" />)
        }


        const url = `/users/${this.props.user.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachUser">
                <li><Link to={url}><h3> {this.props.user.first_name} {this.props.user.last_name}</h3> </Link></li>

                {
                    this.state.isEditFormDisplayed
                        ?
                        <UserUpdate
                            user={this.props.user}
                            toggleEditForm={this.toggleEditForm}
                            refreshUserList={this.props.refreshUserList}
                        />
                        : null

                }
                <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>
                </li>
                <li> <button onClick={this.deleteUser}><h4>Delete</h4></button>
                </li>
            </div>

        )
    }

}
export default User;