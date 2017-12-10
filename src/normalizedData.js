import data from './data.json';

const lowCountries = ['France', 'Norway', 'Sweden'];
export const lowCarbonCountries = {
  color: '#2ecc71',
  countries: data.features.filter((feature) => {
    return lowCountries.includes(feature.properties.name);
  })
}

const mediumCountries = ['Spain', 'Portugal', 'Austria', 'Germany'];
export const mediumCarbonCountries = {
  color: '#e67e22',
  countries: data.features.filter((feature) => {
    return mediumCountries.includes(feature.properties.name);
  })
}

const highCountries = ['United Kingdom', 'Poland', 'Ireland'];
export const highCarbonCountries = {
  color: '#c0392b',
  countries: data.features.filter((feature) => {
    return highCountries.includes(feature.properties.name);
  })
}

const dynamicCountries = [].concat(lowCountries, mediumCountries, highCountries);
export const staticCountries = data.features.filter((feature) => {
  return !dynamicCountries.includes(feature.properties.name) 
});

export const mapStyle = {
  version: 8,
  sources: {
    world: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: staticCountries
      }
    }
  },
  layers: [{
    id: "countries",
    type: "fill",
    source: "world",
    layout: {},
    paint: {
      'fill-color': '#6F788A'
    }
  }]
};