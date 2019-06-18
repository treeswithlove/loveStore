// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import UserSingle from './UserSingle'
import UserCreate from './UserCreate'
import axios from 'axios'

class UserIndex extends Component {
    state = {
        users: [],
        error: "",
        showCreateForm: false

    }
    componentDidMount = () => {
        axios.get('/api/v1/users/')
        .then((res) => {
            this.setState({ users: res.data })
        })
    }

    toggleCreateForm = () => {
        this.setState((state) => {
            return { showCreateForm: !state.showCreateForm }
        })
    }

    //updates list after creating new user
    updateUserList = (newUser) => {
        const users = [...this.state.users]
        users.unshift(newUser)
        this.setState({users: users})
    }

    //updates list after creating new user
    refreshUserList = () => {
        axios.get('/api/v1/users/')
        .then(res => {
            this.setState({ users: res.data })
        })
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        const users = this.state.users
        const userComponents = users.map((user, index) => {
            return (<UserSingle
                key={index}
                index={index}
                user={user}
                refreshUserList = {this.refreshUserList}
            />
            )
        })


        return (
            <div>
                <h1>Members List</h1>
                <button onClick={this.toggleCreateForm}>Become A Member</button>
                {
                    this.state.showCreateForm
                        ? <UserCreate 
                        toggleCreateForm={this.toggleCreateForm}
                        updateUserList={this.updateUserList}
                        refreshUserList = {this.refreshUserList}
                        />
                        : null
                }
                <div>
                    {userComponents}
                </div>
            </div>

        )
    }

}
export default UserIndex;