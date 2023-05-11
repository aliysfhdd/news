import { IResponseApi, IResult } from "@/interface/article";
const OPTION_PRICE=[10_000,1_000,5_000]
export const fetchMostEmail=async (day:1 | 7 | 30):Promise<IResult[]>=> {
	let url=`https://api.nytimes.com/svc/mostpopular/v2/emailed/${day}.json?`
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297'
	}
	const response = await fetch(url + new URLSearchParams(param));
	const jsonData:IResponseApi = await response.json();
	if(jsonData?.fault){
		throw Error('Max Call')
	}
	return jsonData.results.map((data)=> {
		data.price = OPTION_PRICE[Math.floor(Math.random() * OPTION_PRICE.length)]
		return data
	})
}


export const fetchMostShared=async (day:1 | 7 | 30):Promise<IResult[]>=> {
	let url=`https://api.nytimes.com/svc/mostpopular/v2/shared/${day}.json?`
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297'
	}
	const response = await fetch(url + new URLSearchParams(param));
	const jsonData:IResponseApi = await response.json();
	if(jsonData?.fault){
		throw Error('Max Call')
	}
	return jsonData.results.map((data)=> {
		data.price = OPTION_PRICE[Math.floor(Math.random() * OPTION_PRICE.length)]
		return data
	})
}

export const fetchMostViewed=async (day:1 | 7 | 30):Promise<IResult[]>=> {
	let url=`https://api.nytimes.com/svc/mostpopular/v2/viewed/${day}.json?`
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297'
	}
	const response = await fetch(url + new URLSearchParams(param));
	const jsonData:IResponseApi = await response.json();
	if(jsonData?.fault){
		throw Error('Max Call')
	}
	return jsonData.results.map((data)=> {
		data.price = OPTION_PRICE[Math.floor(Math.random() * OPTION_PRICE.length)]
		return data
	})
}

export const fetchArticleByWebURL= async (web_url:string):Promise<any>=> {
	let url="https://api.nytimes.com/svc/search/v2/articlesearch.json?"
	let param={
		'api-key':'NsnpPmn8d8c3ZmmEHjU3SkNkXX5Jv297',
		'fl':'headline,web_url',
		'q':web_url
	}

	const response = await fetch(url + new URLSearchParams(param));
	const jsonData = await response.json();
	return jsonData
}

