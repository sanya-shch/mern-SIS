import React, {Component} from 'react'

import Map from '../../components/map/Map.js'
import ParallaxLogoImage from '../../components/parallaxlogo/ParallaxLogoImage.js'

import "./HomePage.css"

class HomePage extends Component {
    render() {
        return (
            <div >
                {/*<ParallaxLogoImage/>*/}
                {/*<br/>*/}
                <p className="boby_block">HomePage</p>
                <header >
                    <h1>Welcome to React</h1>
                </header>

                {/*<br/>*/}
                {/*<Map/>*/}
            </div>
        )
    }
}

export default HomePage;
