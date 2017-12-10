import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { mapStyle, lowCarbonCountries, mediumCarbonCountries, highCarbonCountries } from './normalizedData';

const Map = ReactMapboxGl({});

const zoom = [2];

const CarbonLayer = ({ id, color, countries, onMouseEnter, onMouseLeave, onClick }) => (
  <Layer
    type="fill"
    id={id}
    paint={{
      'fill-color': color,
      'fill-opacity': 1
    }}
  >
  {
    countries.map((country, index) => (
      <Feature
        key={index}
        onMouseEnter={({ map }) => onMouseEnter(map, country, id)}
        onMouseLeave={({ map }) => onMouseLeave(map, country, id)}
        onClick={({ map }) => onClick(map, country, id)}
        coordinates={country.geometry.coordinates}
      />
    ))
  }
  </Layer>
)

class App extends Component {

  onMouseEnterCountry = (map, country, id) => {
    map.getCanvas().style.cursor = 'pointer';
    console.log('Mouse enter', country.properties.name);
  }

  onMouseLeaveCountry = (map, country, id) => {
    map.getCanvas().style.cursor = '';    
    console.log('Mouse leave', country.properties.name);
  }

  onClickCountry = (map, country, id) => {
    console.log('Mouse click', country.properties.name);
  }

  render() {
    return (
      <div>
        <Map
          zoom={zoom}
          containerStyle={{
            width: '100vw',
            height: '100vh'
          }}
          style={mapStyle}
        >
          <CarbonLayer
            id="lowCarbon"
            color={lowCarbonCountries.color}
            countries={lowCarbonCountries.countries}
            onMouseEnter={this.onMouseEnterCountry}
            onMouseLeave={this.onMouseLeaveCountry}
            onClick={this.onClickCountry}
          />
          <CarbonLayer
            id="mediumCarbon"
            color={mediumCarbonCountries.color}
            countries={mediumCarbonCountries.countries}
            onMouseEnter={this.onMouseEnterCountry}
            onMouseLeave={this.onMouseLeaveCountry}
            onClick={this.onClickCountry}
          />
          <CarbonLayer
            id="highCarbon"
            color={highCarbonCountries.color}
            countries={highCarbonCountries.countries}
            onMouseEnter={this.onMouseEnterCountry}
            onMouseLeave={this.onMouseLeaveCountry}
            onClick={this.onClickCountry}
          />
        </Map>
      </div>
    );
  }
}

export default App;
