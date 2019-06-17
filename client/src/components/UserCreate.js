import React, { Component } from 'react'
import axios from 'axios'

class UserCreate extends Component {
    state = {
        error: '',
        newUser: {}
    }

    // 
    handleChange = (e) => {
        let newUser = { ...this.state.newUser }
        newUser[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newUser: newUser })
    }

    //Creates User
    createUser = (e) => {
        e.preventDefault()
        let cloneUser = { ...this.state.newUser }
        cloneUser.order = this.props.id
        axios.post('/api/v1/users/', this.state.newUser)
            .then(res => {
                console.log(res.data)
                this.props.updateUserList(res.data)
                this.props.toggleCreateForm()
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err.message })
            })
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }

       
        return (
            <div>

                    <form onSubmit={this.createUser}>

                                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            onChange={this.handleChange}
                            value={this.state.newUser.first_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            onChange={this.handleChange}
                            value={this.state.newUser.last_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.newUser.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="address_line1">Address Line 1</label>
                        <input
                            id="address_line1"
                            name="address_line1"
                            onChange={this.handleChange}
                            value={this.state.newUser.address_line1}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            onChange={this.handleChange}
                            value={this.state.newUser.city}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">state</label>
                        <input
                            id="state"
                            name="state"
                            onChange={this.handleChange}
                            value={this.state.newUser.state}
                        />
                    </div>
                    <div>
                        <label htmlFor="country">country</label>
                        <input
                            id="country"
                            name="country"
                            onChange={this.handleChange}
                            value={this.state.newUser.country}
                        />
                    </div>
                    <div>
                        <label htmlFor="postal_code">postal_code</label>
                        <input
                            id="postal_code"
                            name="postal_code"
                            onChange={this.handleChange}
                            value={this.state.newUser.postal_code}
                        />
                    </div>
                        <div>
                            <input type='submit' value='submit' />
                        </div>
                    </form>

         </div>
        )
    }

}
export default UserCreate;