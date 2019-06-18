// import { Link } from "react-router-dom"
import React, { Component } from 'react'
// import Shell from './shell'
import ShellIndex from './ShellIndex'
import OrderIndex from './OrderIndex'
import UserIndex from './UserIndex'
import axios from 'axios'

class Content extends Component {
    state = {
       error:"",
       pic: [],
       weather: [],
       temp: []
    }
    componentDidMount = () => {
        this.weatherAPI();
    }
    
    weatherAPI = () => {
        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=33&lon=-84`)
        .then(res => {
        console.log(res.data['weather'])
         let image = document.getElementById('pic').src = res.data['weather'][0]['icon']
         let weather = document.getElementById('sky').innerHTML = res.data['weather'][0]['main']
         let temp = document.getElementById('hot').innerHTML = res.data['main']['temp']
         this.setState({pic: image, type: weather, temp: temp})
        })
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }


        return (
            <div>
                <h4 id="sky"> </h4>
                <h4 id="hot"> degrees</h4>
                <img id="pic" src="" alt="weather for Latitude Longitude"/>

                <UserIndex/>
                <OrderIndex/>
                <ShellIndex/>
            </div>
        )
    }

}
export default Content; 