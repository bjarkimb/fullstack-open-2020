import React from 'react'
import CountryInfo from './CountryInfo'
import CountryButton from './CountryButton'

const filterItems = (arr, query) => {
  return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}


const ListCountries = ({ filterText, countries, handleClick }) => {
	const countryList = filterItems(countries, filterText)
	if (countryList.length > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	}
	else if (countryList.length > 1) {
		return(
			countryList.map((country) =>
        		<CountryButton key={country.name} country={country} handleClick={handleClick} />
        	)
		)
	}
	else if (countryList.length === 1) {
		return(
			<div>
				<CountryInfo country={countryList[0]} />
			</div>
		)
	}
	else {
		return(
			<p>No matches</p>
		)
	}
}

export default ListCountries