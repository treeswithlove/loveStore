// import { Link } from "react-router-dom"
import React, { Component } from 'react'
import Shell from './shell'
import ShellIndex from './ShellIndex'
import axios from 'axios'

class ProductList extends Component {
    state = {
       error:""
    }
    componentDidMount = () => {
       
    }


    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
       

        return (
            <div>
                <h1>Product List</h1>
                <ShellIndex/>
            </div>
        )
    }

}
export default ProductList;