import {URLSearchParams} from "url";

export const fetchSearchArticle=async (query,page)=> {
	let url="https://api.nytimes.com/svc/search/v2/articlesearch.json?"
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297',
		page
	}
	if(query){
		param['q']=query
	}

	const response = await fetch(url + new URLSearchParams(param));
	const jsonData = await response.json();
	return jsonData
	console.log(jsonData);
}
