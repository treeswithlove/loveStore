
import React, { Component } from 'react'
import axios from 'axios'


class UserUpdate extends Component {
    state = {
        error: '',
        currentUser: {}
    }
    
    componentDidMount = () => {
        this.setState((state) => {
            return {
                currentUser: this.props.user
            }
        })
    }

    handleChange = (e) => {
        let currentUser = { ...this.state.currentUser }
        currentUser[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ currentUser: currentUser })
    }

    //updates user
    updateUser = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/users/${this.state.currentUser.id}/`, this.state.currentUser)
            .then(() => {
                // this.setState({ isEditFormDisplayed: false })
                this.props.toggleEditForm()
                this.props.refreshUserList()

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


        return (
            <div>

                <form onSubmit={this.updateUser}>

                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            onChange={this.handleChange}
                            value={this.state.currentUser.first_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            onChange={this.handleChange}
                            value={this.state.currentUser.last_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.currentUser.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            onChange={this.handleChange}
                            value={this.state.currentUser.price}
                        />
                    </div>
                    <div>
                        <label htmlFor="address_line1">Address Line 1</label>
                        <input
                            id="address_line1"
                            name="address_line1"
                            onChange={this.handleChange}
                            value={this.state.currentUser.address_line1}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            onChange={this.handleChange}
                            value={this.state.currentUser.city}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">state</label>
                        <input
                            id="state"
                            name="state"
                            onChange={this.handleChange}
                            value={this.state.currentUser.state}
                        />
                    </div>
                    <div>
                        <label htmlFor="country">country</label>
                        <input
                            id="country"
                            name="country"
                            onChange={this.handleChange}
                            value={this.state.currentUser.country}
                        />
                    </div>
                    <div>
                        <label htmlFor="postal_code">postal_code</label>
                        <input
                            id="postal_code"
                            name="postal_code"
                            onChange={this.handleChange}
                            value={this.state.currentUser.postal_code}
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
export default UserUpdate;