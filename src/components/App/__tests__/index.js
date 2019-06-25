import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { App } from '..'

const props = {
  store: {
    countries: [
      {
        key: 'ru',
        value: 'ru',
        text: 'Russia'
      },
      {
        key: 'ua',
        value: 'ua',
        text: 'Ukraine'
      }
    ],
    isCountriesLoading: false,
    selectedCountry: 'ru',
    cities: [
      {
        country: 'Russia',
        latitude: '43',
        longitude: '42',
        region: 'Leningradskaya',
        title: 'Saint-Peterspurg',
      },
      {
        country: 'Ukraine',
        latitude: '42',
        longitude: '43',
        region: 'Kievskaia',
        title: 'Kiev',
      }
    ],
    selectedCity: 'Saint-Peterspurg',
    temperature: 26,
    isSearchLoading: false,
    searchResults: [],
    searchValue: '',
    isWeatherLoading: false,
  }
}

describe('App component', () => {
  it('renders without error', () => {
    const tree = shallow(<App {...props} />)
    expect(shallowToJson(tree)).toMatchSnapshot()
  })
})
