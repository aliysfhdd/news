import { IResult } from "@/interface/article";
import { fetchMostEmail, fetchMostShared, fetchMostViewed } from "@/api";
import ListArticle from "@/app/articles/listArticle";
import Link from "next/link";
import React from "react";

const Articles =async (
	{ searchParams }:{searchParams: { [key: string]: string | string[] | undefined}}
)=>{
	let filter: string | string[] | undefined =''
	if(searchParams){
		filter=searchParams['filter']
	}
	let parsedData:IResult[]=[];
	const [email,shared,viewed]=await Promise.all([fetchMostEmail(30),fetchMostShared(30),fetchMostViewed(30)])
	if(filter==='email'){
		parsedData=email
	}
	else if(filter==='shared'){
		parsedData=shared
	}
	else if(filter==='viewed'){
		parsedData=viewed
	}
	else{
		parsedData=[...email,...shared,...viewed].reduce(function (prev:IResult[], current:IResult) {
			if (!prev.some(function (article) { return article.id === current.id; })) prev.push(current);
			return prev
		}, []);
	}
	return(
		<div>
			<div>
				<Link href={'/articles?filter=email'} replace>Email</Link>
				<Link href={'/articles?filter=viewed'} replace>Viewed</Link>
				<Link href={'/articles?filter=shared'} replace>Shared</Link>
			</div>
			<ListArticle listData={parsedData}></ListArticle>
		</div>
		)
}

export default Articles
