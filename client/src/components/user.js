
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
            .then((res) => {
                this.setState({ user: res.data, isEditFormDisplayed: false })
            })
    }
    //creates clone as placeholder
    handleChange = (e) => {
        const newUser = { ...this.state.user }
        newUser[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ user: newUser })
    }

    //deletes User
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
   
        return (
            //when map, maps through data this will be seen for each
            <div className="eachUser">
                <li><h3>{this.state.user.first_name} {this.state.user.last_name}</h3></li>
                <li><h4>{this.state.user.email} </h4> </li>
                <li><h4>{this.state.user.address_line1} </h4> </li>
                <li><h4>{this.state.user.city}, {this.state.user.state} {this.state.user.country}, {this.state.user.postal_code} </h4> </li>
             
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateUser}>
                          
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            onChange={this.handleChange}
                            value={this.state.user.first_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            onChange={this.handleChange}
                            value={this.state.user.last_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.user.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="address_line1">Address Line 1</label>
                        <input
                            id="address_line1"
                            name="address_line1"
                            onChange={this.handleChange}
                            value={this.state.user.address_line1}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            onChange={this.handleChange}
                            value={this.state.user.city}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">state</label>
                        <input
                            id="state"
                            name="state"
                            onChange={this.handleChange}
                            value={this.state.user.state}
                        />
                    </div>
                    <div>
                        <label htmlFor="country">country</label>
                        <input
                            id="country"
                            name="country"
                            onChange={this.handleChange}
                            value={this.state.user.country}
                        />
                    </div>
                    <div>
                        <label htmlFor="postal_code">postal_code</label>
                        <input
                            id="postal_code"
                            name="postal_code"
                            onChange={this.handleChange}
                            value={this.state.user.postal_code}
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