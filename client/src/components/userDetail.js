import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//styled components or bootstrap or materialize
class User extends Component {
    state = {
        user: {},
        redirectToHome: false,
        redirectUserList: false,
        isEditFormDisplayed: false
    }
    //gets the user
    componentDidMount = () => {
        //     this.props.getUsers()
        // }
        // getUsers = () => {
        axios.get(`/api/v1/users/${this.props.match.params.id}/`)
            .then(res => {
                this.setState({ user: res.data })
            })
    }
    toggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }
    //updates user
    updateUser = (e) => {
        e.preventDefault()
        console.log(this.state.user)
        axios.put(`/api/v1/users/${this.state.user.id}/`, this.state.user)
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }
    //creates clone as placeholder
    handleChange = (e) => {
        const newUser = { ...this.state.user }
        newUser[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ user: newUser })
    }

    //deletes user
    deleteUser = (e) => {
        e.preventDefault();
        axios.delete(`/api/v1/users/${this.state.user.id}/`)
            .then(() => {
                this.setState({ redirectUserList: true })
            })
    }

    render() {
        if (this.state.redirectUserList){
            return (<Redirect to="/users/" />)
        }
        const url = `/users/${this.props.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachUser">
                <li><Link to={url}><h3>{this.state.user.name} </h3> </Link></li>
                <li><img src={this.state.user.image_url} alt={this.props.name} /> </li>
                <li><h4>{this.state.user.description} </h4> </li>
                <li><h4>${this.state.user.price}</h4> </li>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateUser}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.user.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.handleChange}
                                    value={this.state.user.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.user.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.user.price}
                                />
                            </div>
                            <input type="submit" value="submit" />
                            <input onClick={this.deleteUser} type='submit' value='delete' />

                        </form>
                        : null

                }  <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>




                </li>
            </div>

        )
    }

}
export default User;