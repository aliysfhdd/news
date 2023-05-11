import { IResult } from "@/interface/article";
import {E_BUY_ARTICLE} from "@/constants";
const MINIMUM_GET_TICKET=50_000;
const INITIAL_BALANCE=100_000;
const LIMIT_FREE=5;
export const buyArticle=(data:IResult)=>{
	let articles=localStorage.getItem("boughtArticle")
	if(articles){
		let parsedArticles:IResult[]=JSON.parse(articles)
		if(parsedArticles.every((article)=>article.id!=data.id)){
			return updateBoughArticle(data, parsedArticles)
		}
		return E_BUY_ARTICLE.ALREADY
	}
	return updateBoughArticle(data)
}

const updateBoughArticle=(data:IResult, currentArticle?:IResult[])=>{
	if(data.price==0){
		let currFree=JSON.parse(localStorage.getItem('free_article') || '0')
		if(Number(currFree) > LIMIT_FREE){
			return E_BUY_ARTICLE.LIMIT
		}
		localStorage.setItem('free_article', String(Number(currFree)+1))
	}
	let currNow= getCurrentBalance()-data.price
	if(currNow<0){
		return E_BUY_ARTICLE.INSUFFICIENT
	}
	else {
		updateTotalPurchase(data.price)
		localStorage.setItem('balance', String(currNow))
		if(currentArticle){
			localStorage.setItem('boughtArticle',JSON.stringify([...currentArticle,data]))
		}
		else{
			localStorage.setItem('boughtArticle',JSON.stringify([data]))
		}
	}
}

const updateTotalPurchase=(newPurchase:number)=>{
	let currentPurchase=getCurrentPurchase()
	let diffCurrent=currentPurchase % MINIMUM_GET_TICKET;
	let currentTicket=getCurrentTicket()
	localStorage.setItem("total_purchase",String(currentPurchase+newPurchase))
	localStorage.setItem("ticket",String(currentTicket+Math.floor((diffCurrent+newPurchase)/MINIMUM_GET_TICKET)))

}

export const getArticleById=(id:number)=>{
	let articles=localStorage.getItem("articles");
	if(articles){
		let result=JSON.parse(articles).filter((data:IResult)=>data.id==id)
		if(result.length){
			return result[0]
		}
	}
	return null
}

export const initMoney=()=>{
	let balance=localStorage.getItem("balance")
	let totalPurchase=localStorage.getItem("total_purchase")
	let ticket=localStorage.getItem("ticket")
	if(balance===undefined){
		localStorage.setItem("balance",String(INITIAL_BALANCE))
	}
	if(totalPurchase===undefined){
		localStorage.setItem("total_purchase",String(0))
	}
	if(ticket===undefined){
		localStorage.setItem("ticket",String(0))
	}
}

export const getCurrentBalance=()=>{
	let balance=localStorage.getItem("balance")
	if(balance){
		return Number(balance)
	}
	localStorage.setItem("balance",String(INITIAL_BALANCE))
	return INITIAL_BALANCE
}

const getCurrentPurchase=()=>{
	let purchase=localStorage.getItem("total_purchase")
	if(purchase){
		return Number(purchase)
	}
	localStorage.setItem("total_purchase",String(0))
	return 0
}

export const getCurrentTicket=()=>{
	let ticket=localStorage.getItem("ticket")
	if(ticket){
		return Number(ticket)
	}
	localStorage.setItem("ticket",String(0))
	return 0
}


export const getMyBoughtArticle=():IResult[]=>{
	let articles=localStorage.getItem("boughtArticle")
	if(articles){
		return JSON.parse(articles)
	}
	return []
}

export const accumulatePoint=(plusPoint:number,ticket:number)=>{
	localStorage.setItem("balance",String(getCurrentBalance()+plusPoint))
	localStorage.setItem('ticket',String(ticket-1))
}


export const numberFormat=Intl.NumberFormat().format