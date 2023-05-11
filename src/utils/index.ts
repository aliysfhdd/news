import { IResult } from "@/interface/article";

export const buyArticle=(data:IResult)=>{
	let articles=localStorage.getItem("boughtArticle")
	if(articles){
		let parsedArticles:IResult[]=JSON.parse(articles)
		if(parsedArticles.every((article)=>article.id!=data.id)){
			return updateBoughArticle(data, parsedArticles)
		}
		return "Already"
	}
	return updateBoughArticle(data)
}

const updateBoughArticle=(data:IResult, currentArticle?:IResult[])=>{
	let currNow= getCurrentBalance()-data.price
	if(currNow<0){
		return "Fail"
	}
	else {
		localStorage.setItem('balance', String(currNow))
		if(currentArticle){
			localStorage.setItem('boughtArticle',JSON.stringify([...currentArticle,data]))
		}
		else{
			localStorage.setItem('boughtArticle',JSON.stringify([data]))
		}
	}
}

export const getArticleById=(id:number)=>{
	let articles=localStorage.getItem("articles");
	if(articles){
		let result=JSON.parse(articles).filter((data:IResult)=>data.id==id)
		if(result.length){
			return result[0]
		}
	}
	return 0
}

export const initMoney=()=>{
	let balance=localStorage.getItem("balance")
	if(balance===undefined){
		localStorage.setItem("balance",String(100_000))
	}
}

const getCurrentBalance=()=>{
	let balance=localStorage.getItem("balance")
	if(balance){
		return Number(balance)
	}
	localStorage.setItem("balance",String(100_000))
	return 100_000
}


export const getMyBoughtArticle=():IResult[]=>{
	let articles=localStorage.getItem("boughtArticle")
	if(articles){
		return JSON.parse(articles)
	}
	return []
}

export const accumulatePoint=(plusPoint:number)=>{
	localStorage.setItem("balance",String(getCurrentBalance()+plusPoint))
}
