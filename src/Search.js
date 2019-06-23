import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';
import { Search } from 'semantic-ui-react';

import { requestSearchCity } from './requests.js';

const resultRenderer = ({ title }) => <span>{title}</span>;

const SearchCity = ({ store }) => {

  const handleResultSelect = (e, { result }) => {
    store.addCity(result);
    store.searchValue = '';
  };

  const handleSearchChange = (e, { value }) => {
    store.searchValue = value;

    if (value.length > 2) {
      store.isSearchLoading = true;
      requestSearchCity(store.selectCountry, store.searchValue)
        .then(response => response.json())
        .then(data => {
          store.searchResults = data.map(({ city, ...other }) => ({
            title: city,
            ...other
          }));
          store.isSearchLoading = false;

          console.log('fetching city');
        },
        error => {
          console.log(error);
          store.isSearchLoading = false;
        })
    }
  }

  return (
    <Search
      disabled={!store.selectCountry}
      loading={store.isSearchLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      results={store.searchResults}
      value={store.searchValue}
      resultRenderer={resultRenderer}
      placeholder='Search city...'
    />
  )
}

export default observer(SearchCity);