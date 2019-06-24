import React from 'react';
import { observer } from 'mobx-react';
import { Search } from 'semantic-ui-react';

const SearchCity = ({ store: { 
                              selectedCountry,
                              searchValue,
                              handleSearchChange,
                              isSearchLoading,
                              searchResults, 
                              handleResultSelect } 
                            }) => {

  return (
    <Search
      disabled={!selectedCountry}
      loading={isSearchLoading}
      onResultSelect={(e, { result }) => handleResultSelect(result)}
      onSearchChange={(e, { value }) => handleSearchChange(value)}
      results={searchResults}
      value={searchValue}
      placeholder='Search city...'
    />
  )
}

export default observer(SearchCity);
