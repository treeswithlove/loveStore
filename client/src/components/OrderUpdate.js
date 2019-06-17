
import React, { Component } from 'react'
import axios from 'axios'


class OrderUpdate extends Component {
    state = {
        error: '',
        currentOrder: {}
    }
    
    componentDidMount = () => {
        this.setState((state) => {
            return {
                currentOrder: this.props.order
            }
        })
    }

    handleChange = (e) => {
        let currentOrder = { ...this.state.currentOrder }
        currentOrder[e.target.name] = e.target.value
        console.log(e.target.name)
        this.setState({ currentOrder: currentOrder })
    }

    //updates order
    updateOrder = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/orders/${this.state.currentOrder.id}/`, this.state.currentOrder)
            .then(() => {
                // this.setState({ isEditFormDisplayed: false })
                this.props.toggleEditForm()
                this.props.refreshOrderList()

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

                <form onSubmit={this.updateOrder}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.currentOrder.name}
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
export default OrderUpdate;