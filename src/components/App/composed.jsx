import { inject, observer } from 'mobx-react';
import {
  compose,
  lifecycle
} from 'recompose';

import { requestCountries } from '../../requests.js';

const AppComposed = compose(
  inject('store'),

  lifecycle({
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
              return;
            }
            data = data.map(({code, name}) => ({
              key: code,
              value: code,
              text: name
            }));
            localStorage.setItem('countries', JSON.stringify(data));
            updateCountries(data);
          },
          error => {
            console.log(error);
          })
      }
    }
  }),

  observer,
)

export default AppComposed;
