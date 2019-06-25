import React from 'react';
import './App.css';

import { List, Button, Dropdown, Loader, Dimmer } from 'semantic-ui-react';

import AppComposed from './composed';
import SearchCity from '../SearchCity';

const CustomLoader = () => (
  <Dimmer active inverted>
    <Loader inverted />
  </Dimmer>
)

const App = ({ store,
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
            }) => (
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

export default AppComposed(App);
