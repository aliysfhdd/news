import { IResponseApi, IResult } from "@/interface/article";

const generatePriceArticle=(date:Date):number=>{
	const currDate= new Date();
	const pastWeek = new Date(new Date().setDate(currDate.getDate()-7));
	const yesterday = new Date(new Date().setDate(currDate.getDate()-1));
	if(new Date(date)<pastWeek){
		return 0
	}
	if(new Date(date)>pastWeek && new Date(date)<yesterday){
		return 20_000
	}
	return 50_000
}
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
		data.price = generatePriceArticle(data.published_date)
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
		data.price = generatePriceArticle(data.published_date)
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
		data.price = generatePriceArticle(data.published_date)
		return data
	})
}

