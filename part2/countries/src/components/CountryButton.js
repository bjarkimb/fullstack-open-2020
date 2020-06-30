import React from 'react'

const CountryButton = ({country, handleClick}) => {
	console.log('hehehe', country.name)
	return (
		<div>
			{country.name}
			<button onClick={() => handleClick(country.name)}>show</button>
		</div>
	)
}

export default CountryButton