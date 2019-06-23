import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';

import SearchCity from './Search.js';
import { List, Button, Dropdown, Loader, Dimmer } from 'semantic-ui-react';

import { requestCountries } from './requests.js'

const CustomLoader = () => (
  <Dimmer active inverted>
    <Loader inverted />
  </Dimmer>
)

class App extends Component {

  componentDidMount() {
    const { store } = this.props;
    const countries = localStorage.getItem('countries');

    if (countries) {
      store.countries = JSON.parse(countries);
      store.isFetching = false;
    }
  
    const cities = localStorage.getItem('cities');
  
    if (cities) store.cities = JSON.parse(cities);
  
    if (!store.countries) {
      requestCountries()
        .then(response => response.json())
        .then(data => {
          data = data.map(({code, name}) => ({
            key: code,
            value: code,
            text: name
          }));
          store.countries = data;
          localStorage.setItem('countries', JSON.stringify(data));
          store.isFetching = false;

          console.log('fetching');
        },
        error => {
          console.log(error);
          store.isFetching = false;
        })
    }
  }

  render() {
    const { store } = this.props;

    return (
      <div className='App'>
        <div className='wrapper'>
          {store.isFetching ?
            <CustomLoader /> :
            <>
              <div className='app-temp'>
                {store.isWeatherLoading ? 
                  <CustomLoader /> :
                  <span className='app-temp-value'>{`${store.temperature}°C`}</span>
                }
              </div>
              <div className='app-input'>
                <Dropdown
                  onChange={(e, { value }) => store.updateSelectCounrty(value)}
                  placeholder='Select Country...'
                  fluid
                  search
                  selection
                  options={store.countries}
                />
              </div>
              <div className='app-input'>
                <SearchCity store={store} />
              </div>
              <List selection>
                {store.cities.map(({ title, latitude, longitude }) => (
                  <List.Item key={latitude} onClick={() => store.fetchWeather(latitude, longitude)}>
                    <List.Content floated='right'>
                      <Button icon='delete' size='mini' onClick={() => store.removeCity(title)} />
                    </List.Content>
                    <List.Icon name='marker' size='large' verticalAlign='middle' />
                    <List.Content verticalAlign='middle'>
                      <List.Header>{title}</List.Header>
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
