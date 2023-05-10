import { IResponseApi, IResult } from "@/interface/article";

export const fetchMostEmail=async (day:1 | 7 | 30):Promise<IResult[]>=> {
	let url=`https://api.nytimes.com/svc/mostpopular/v2/emailed/${day}.json?`
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297'
	}
	const response = await fetch(url + new URLSearchParams(param));
	const jsonData:IResponseApi = await response.json();
	return jsonData.results
}


export const fetchMostShared=async (day:1 | 7 | 30):Promise<IResult[]>=> {
	let url=`https://api.nytimes.com/svc/mostpopular/v2/shared/${day}.json?`
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297'
	}
	const response = await fetch(url + new URLSearchParams(param));
	const jsonData:IResponseApi = await response.json();
	return jsonData.results
	console.log(jsonData);
}



export const fetchMostViewed=async (day:1 | 7 | 30):Promise<IResult[]>=> {
	let url=`https://api.nytimes.com/svc/mostpopular/v2/viewed/${day}.json?`
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297'
	}
	const response = await fetch(url + new URLSearchParams(param));
	const jsonData:IResponseApi = await response.json();
	return jsonData.results
	console.log(jsonData);
}

export const fetchArticleByWebURL= async (web_url:string):Promise<any>=> {
	let url="https://api.nytimes.com/svc/search/v2/articlesearch.json?"
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297',
		'fl':'headline',
		'q':web_url
	}

	const response = await fetch(url + new URLSearchParams(param));
	const jsonData = await response.json();
	return jsonData
	console.log(jsonData);
}

