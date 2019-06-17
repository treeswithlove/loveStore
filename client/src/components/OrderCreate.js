
import React, { Component } from 'react'
import axios from 'axios'


class OrderCreate extends Component {
    state = {
        error: '',
        newOrder: {}
    }

    // 
    handleChange = (e) => {
        let newOrder = { ...this.state.newOrder }
        newOrder[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ newOrder: newOrder })
    }

    //Creates Order
    createOrder = (e) => {
        e.preventDefault()
        axios.post('/api/v1/orders/', this.state.newOrder)
            .then(res => {
                console.log(res.data)
                this.props.updateOrderList(res.data)
                this.props.toggleCreateForm()
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

                <form onSubmit={this.createOrder}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.newOrder.name}
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
export default OrderCreate;