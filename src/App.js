import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';

import SearchCity from './SearchCity.js';
import { List, Button, Dropdown, Loader, Dimmer } from 'semantic-ui-react';

import { requestCountries } from './requests.js'

const CustomLoader = () => (
  <Dimmer active inverted>
    <Loader inverted />
  </Dimmer>
)

class App extends Component {

  componentDidMount() {
    const { store: { 
              countries,
              updateCountries,
              updateCities
            }
          } = this.props;

    const storageCountries = localStorage.getItem('countries');
    if (storageCountries) updateCountries(JSON.parse(storageCountries));
  
    const storageCities = localStorage.getItem('cities');
    if (storageCities) updateCities(JSON.parse(storageCities));
  
    if (countries.length === 0) {
      requestCountries()
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
            updateCountries();
            return;
          }
          data = data.map(({code, name}) => ({
            key: code,
            value: code,
            text: name
          }));
          localStorage.setItem('countries', JSON.stringify(data));
          updateCountries(data);

          console.log('fetching');
        },
        error => {
          updateCountries();
          console.log(error);
        })
    }
  }

  render() {
    const { store,
            store: { 
              isCountriesLoading,
              isWeatherLoading,
              temperature,
              countries,
              cities,
              selectedCity,
              updateSelectCounrty,
              handleCityClick,
              removeCity
            }
          } = this.props;

    return (
      <div className='App'>
        <div className='wrapper'>
          {isCountriesLoading ?
            <CustomLoader /> :
            <>
              <div className='app-temp'>
                {isWeatherLoading ? 
                  <CustomLoader /> :
                  <span className='app-temp-value'>{`${temperature}°C`}</span>
                }
              </div>
              <div className='app-input'>
                <Dropdown
                  onChange={(e, { value }) => updateSelectCounrty(value)}
                  placeholder='Select Country...'
                  fluid
                  search
                  selection
                  options={countries}
                />
              </div>
              <div className='app-input'>
                <SearchCity store={store} />
              </div>
              <List selection>
                {cities.map(city => (
                  <List.Item key={city.latitude}
                            active={city.title === selectedCity}
                            onClick={() => handleCityClick(city)}>
                    <List.Content floated='right'>
                      <Button icon='delete' size='mini' onClick={(e) => {
                        e.stopPropagation();
                        removeCity(city);
                      }} />
                    </List.Content>
                    <List.Icon name='marker' size='large' verticalAlign='middle' />
                    <List.Content verticalAlign='middle'>
                      <List.Header>{city.title}</List.Header>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </>
          }
        </div>
      </div>
    )
  }
}

export default observer(App);
