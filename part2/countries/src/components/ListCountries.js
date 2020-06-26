import React from 'react'

const filterItems = (arr, query) => {
  return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

const Display = ({ country }) => {
  return (
    <p>{country.name}</p>
  )
}


const ListCountries = ({ filterText, countries }) => {
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
        		<Display key={country.numericCode} country={country} />
        	)
		)
	}
	else if (countryList.length === 1) {
		return(
			<div>
				<h1>{countryList[0].name}</h1>
				<p>capital {countryList[0].capital}</p>
				<p>population {countryList[0].population}</p>
				<h2>languages</h2>
				<ul>
				{countryList[0].languages.map(language =>
					<li key={language.name}> {language.name}</li>)}
				</ul>
				<img src={countryList[0].flag} alt="selected country's flag" width="200" height="200"/>
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