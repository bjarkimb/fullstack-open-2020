import React from 'react';

const FilterForm = ({ handleFilter }) => {
	return(
		<div>
			<form>
				find countries <input 
	            onChange={handleFilter}
	    	    />
			</form>
		</div>
	)
}

export default FilterForm