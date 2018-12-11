import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                // defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
                defaultCenter = { { lat: 50.428682, lng: 30.476032 } }
                defaultZoom = { 13 }
            >
            </GoogleMap>
        ));
        return(
            <div>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
}

export default Map;
