import { IResult } from "@/interface/article";
import { fetchMostEmail, fetchMostShared, fetchMostViewed } from "@/api";
import ListArticle from "@/app/articles/listArticle";
import Link from "next/link";
import React from "react";
import {FILTER_NAME} from "@/constants";
import styles from './page.module.css';

const Articles =async (
	{ searchParams }:{searchParams: { [key: string]: string | string[] | undefined}}
)=>{
	let filter: string | string[] | undefined =''
	if(searchParams){
		filter=searchParams['filter']
	}
	let parsedData:IResult[]=[];
	const [email,shared,viewed]=await Promise.all([fetchMostEmail(7),fetchMostShared(1),fetchMostViewed(30)])
	if(filter===FILTER_NAME.EMAILED){
		parsedData=email
	}
	else if(filter===FILTER_NAME.SHARED){
		parsedData=shared
	}
	else if(filter===FILTER_NAME.VIEWED){
		parsedData=viewed
	}
	else{
		parsedData=[...email,...shared,...viewed].reduce(function (prev:IResult[], current:IResult) {
			if (!prev.some(function (article) { return article.id === current.id; })) prev.push(current);
			return prev
		}, []);
	}
	return(
		<div className={styles.listArticle}>
			<div className={styles.filter}>
				<Link href={'/articles?filter=email'} replace>
					<p style={filter===FILTER_NAME.EMAILED ?
						{background: 'white', color:'black'}: {}}>Most Emailed</p>
				</Link>
				<Link href={'/articles?filter=viewed'} replace>
					<p style={filter===FILTER_NAME.VIEWED ?
						{background: 'white', color:'black'}: {}}>Most Viewed</p>
				</Link>
				<Link href={'/articles?filter=shared'} replace>
					<p style={filter===FILTER_NAME.SHARED ?
						{background: 'white', color:'black'}: {}}>Most Shared</p>
				</Link>
			</div>
			<ListArticle listData={parsedData}></ListArticle>
		</div>
		)
}

export default Articles
