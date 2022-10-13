import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "1d095d3a11mshb2941a434ff6458p1fa04bjsnbc26a7b97043",
		"X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
	},
};
const Search = ({ onGetSearchData }) => {
	const searchInputHandler = searchData => {
		onGetSearchData(searchData);
	};
	const loadOptions = async searchInput => {
		const response = await fetch(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&minPopulation=500000&namePrefix=${searchInput}`,
			options
		);
		const data = await response.json();
		const citiesArray = data.data.map(data => {
			return {
				label: `${data.city}, ${data.country}`,
				value: `${data.latitude} ${data.longitude}`,
			};
		});

		return {
			options: citiesArray,
		};
	};

	return (
		<div className="mx-auto w-64">
			<AsyncPaginate
				loadOptions={loadOptions}
				onChange={searchInputHandler}
				debounceTimeout={500}
				noOptionsMessage={() => "No city Found"}
			/>
		</div>
	);
};

export default Search;
