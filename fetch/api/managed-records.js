import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";
// Your retrieve function plus any additional functions go here ...
const buildQueryString = (options) => {
	if (options === undefined) {
		options = {page: 0, colors: ["red", "brown", "blue", "yellow", "green"]}
	}
	let page = options.page || 0;
	let colors = options.colors || ["red", "brown", "blue", "yellow", "green"];
	let limit = colors.length || 10;
	let queryString = window.path + '?limit=10&offset=' + page + '&';

	colors.forEach((color) => {
		queryString += 'color[]=' + color + '&';
	})

	return queryString;
}
const retrieve = (options) => {
	var queryString = buildQueryString(options);
	return fetch(queryString)
		.then((res) => {
			return res.json();
		})
		.then(function(res) {
			console.log(res);
			let ids = res.map((record) => {
				return record.id;
			})
			let opens = res.filter((record) => {
				let primaries = ['red', 'blue', 'yellow'];
	      primaries.includes(record.color) ? record.isPrimary = true : record.isPrimary = false;
				return record.disposition === "open"
			})
			let closed = res.filter((record) => {
				return record.disposition === "closed" && record.isPrimary;
			})
			let previousPage = res[0].id === 1 ? null : res[0].id - 1;
			let nextPage = res[0].id + 1 === 11 ? null : res[0].id + 1;
			return {
				ids: ids,
				open: opens,
				closedPrimaryCount: closed.length,
				previousPage: previousPage,
				nextPage: nextPage,
			}
		})
}
retrieve();


export default retrieve;
