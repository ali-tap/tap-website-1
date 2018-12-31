
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class Map extends Component {

componentWillMount(){
  require('./Map.css');
}

render() {

    return (
      <div className='google-map' style={{height:this.props.height?this.props.height:'500px',position: 'relative'}}>
        <div className='tapAddressMapPin'></div>
        {this.props.children}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyApaAVAecsdLIL6lhd9M2glYlE3-98jdJY' }}
          defaultCenter={ { lat: this.props.lat, lng: this.props.lng } }
          defaultZoom={ this.props.zoom }>
        </GoogleMapReact>
      </div>
    )
  }
}
