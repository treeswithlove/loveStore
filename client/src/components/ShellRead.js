import { Link } from "react-router-dom"
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//styled components or bootstrap or materialize
class Shell extends Component {
    state = {
        // currentShell: {},
        // redirectToHome: false,
        // redirectShellList: false,
        // isEditFormDisplayed: false
    }
    // //gets the shell
    // componentDidMount = () => {    
    //     // axios.get(`/api/v1/shells/${this.props.id}/`)
    //     //     .then(res => {
    //     //         // console.log(res)
    //     //         this.setState({ shell: res.data })
    //     //     })
    // }

    // toggleEditForm = () => {
    //     // this.setState((state) => {
    //     //     return { isEditFormDisplayed: !state.isEditFormDisplayed }
    //     // })
    //     this.setState({
    //         newShell: {},
    //         currentShell: {
    //             name: this.props.newShell.name
    //         }
    //     })
    // }

    // //updates shell
    // updateShell = (e) => {
    //     e.preventDefault()
    //     console.log(this.props.shell)
    //     axios.put(`/api/v1/shells/${this.props.shell.id}/`, this.props.shell)
    //         .then(() => {
    //             this.setState({ isEditFormDisplayed: false })
    //         })
    // }
    // // //creates clone as placeholder
    // // handleChange = (e) => {
    // //     const currentShell = { ...this.props.shell }
    // //     currentShell[e.target.name] = e.target.value
    // //     console.log(e.target.name)
    // //     this.setState({ shell: currentShell })
    // // }

    // //deletes shell
    // deleteShell = (e) => {
    //     e.preventDefault();
    //     axios.delete(`/api/v1/shells/${this.props.shell.id}/`)
    //         .then(() => {
    //             this.setState({ redirectShellList: true })
    //         })
    // }

    render() {
        // if (this.state.redirectShellList){
        //     return (<Redirect to="/shells/" />)
        // }

       
        const url = `/shells/${this.state.shell.id}/`
        return (
            //when map, maps through data this will be seen for each
            <div className="eachShell">
                <li><Link to={url}><h3>{this.props.shell.name} </h3> </Link></li>
                <li><img src={this.props.shell.image_url} alt={this.props.name} /> </li>
                <li><h4>{this.props.shell.description} </h4> </li>
                <li><h4>${this.props.shell.price}</h4> </li>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateShell}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.props.handleShellUpdate}
                                    value={this.props.shell.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    onChange={this.props.handleShellUpdate}
                                    value={this.props.shell.image_url}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    onChange={this.props.handleShellUpdate}
                                    value={this.props.shell.description}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    onChange={this.props.handleShellUpdate}
                                    value={this.props.shell.price}
                                />
                            </div>
                            <input type="submit" value="submit" />
                            <input onClick={this.deleteShell} type='submit' value='delete' />

                        </form>
                        : null

                }  <li> <button onClick={this.toggleEditForm}><h4>Edit</h4></button>




                </li>
            </div>

        )
    }

}
export default Shell;