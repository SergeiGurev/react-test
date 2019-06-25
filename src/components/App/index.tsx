import React from 'react'
import './App.css'

import { List, Button, Dropdown, Search, Loader, Dimmer } from 'semantic-ui-react'
import AppComposed, { TProps } from './composed'

const CustomLoader = () => (
  <Dimmer active inverted>
    <Loader inverted />
  </Dimmer>
)

export const App = ({ store: {
                        isCountriesLoading,
                        isWeatherLoading,
                        temperature,
                        countries,
                        cities,
                        selectedCity,
                        updateSelectedCounrty,
                        handleCityClick,
                        removeCity,
                        selectedCountry,
                        searchValue,
                        handleSearchChange,
                        isSearchLoading,
                        searchResults, 
                        handleResultSelect
                      }
                    }: TProps) => (
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
              onChange={(e, { value }: any) => updateSelectedCounrty(value)}
              placeholder='Select Country...'
              fluid
              search
              selection
              options={countries}
            />
          </div>
          <div className='app-input'>
            <Search
              disabled={!selectedCountry}
              loading={isSearchLoading}
              onResultSelect={(e, { result }) => handleResultSelect(result)}
              onSearchChange={(e, { value }: any) => handleSearchChange(value)}
              results={searchResults}
              value={searchValue}
              placeholder='Search city...'
            /> 
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

export default AppComposed(App)
