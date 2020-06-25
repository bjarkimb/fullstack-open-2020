import React from 'react'

const FilterForm = ({ handleFilter }) => {
	return(
		<div>
			<form>
	    	    filter shown with <input 
	            onChange={handleFilter}
	    	    />
	   		</form>
    	</div>
    )
}

export default FilterForm