// import { Link } from "react-router-dom"
import React, { Component } from 'react'
// import Shell from './shell'
import ShellIndex from './ShellIndex'
import OrderIndex from './OrderIndex'
import UserIndex from './UserIndex'

class IndexAll extends Component {
    state = {
        error: "",
    }


    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }


        return (
            <div className="holdIndex">
                <div>
                    <OrderIndex />
                    <UserIndex />
                </div>
                    <ShellIndex />
            </div>
        )
    }

}
export default IndexAll; 