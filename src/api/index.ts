export const fetchSearchArticle=async (page)=> {
	const response = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?" +
		"api-key=NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297&" +
		"page="+page
	);
	const jsonData = await response.json();
	console.log(jsonData);
}
